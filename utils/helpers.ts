'use server';
import path from 'path';
import { Method } from '@/app/About/types/types';
import { CalendarDate } from '@internationalized/date';
import cloudinary from 'cloudinary';
import queryString from 'query-string';
import fs from 'fs';
import crypto from 'crypto';
import { parseBuffer } from 'music-metadata';
import { cookies } from 'next/headers';

export interface IAudioTypes {
  audioDestination: string;
  duration: number | undefined;
}

export async function capitalizeTitle(str: string) {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function generateUrl(
  url: string,
  object: { [key: string]: string }
) {
  const newUrl = await queryString.stringifyUrl(
    {
      url: url,
      query: object,
    },
    { skipNull: true }
  );
  return newUrl;
}

export async function getCalendarDate(date: Date) {
  const day = (await new Date(date).getDate()) || new Date().getDate();
  const month = (await new Date(date).getMonth()) || new Date().getMonth();
  const year = (await new Date(date).getFullYear()) || new Date().getFullYear();
  const calendarDate = await new CalendarDate(year, month, day);
  return calendarDate;
}
export async function getDateObject(date: CalendarDate) {
  const year = (await date.year) || new Date().getFullYear();
  const month = (await date.month) || new Date().getMonth();
  const day = (await date.day) || new Date().getDate();
  return new Date(`${year}-${month}-${day}`);
}


export async function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function uploadImage(image: File, folderName: string) {
  cloudinary.v2.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const buffer = await image.arrayBuffer();

  return new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream(
      {
        resource_type: 'auto',
        folder: `assets/${folderName}`
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result?.secure_url);
        }
      }
    );

    stream.end(Buffer.from(buffer));
  });
}

export async function uploadAudio(audio: File, folderName: string) {
  if (audio.type !== 'audio/mpeg') {
    throw new Error('File must be an MP3 audio file.');
  }
  const buffer = await audio.arrayBuffer();

  return new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream(
      {
        resource_type: 'video', // 'video' is used for audio files in Cloudinary
        folder: folderName,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result?.secure_url);
        }
      }
    );

    stream.end(Buffer.from(buffer));
  });
}

export const fetchApi = async (
  apiUrl: string,
  method: Method,
  body?: object | FormData // Accept FormData as body
) => {
  const url = new URL(apiUrl,process.env.APP_URL);

  const isFormData = body instanceof FormData;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');
  const headers: HeadersInit = isFormData
    ? {}
    : { 'Content-Type': 'application/json' };

  headers['Authorization'] = `Bearer ${accessToken?.value}`;
  try {
    const res = await fetch(url.toString(), {
      method: method.toUpperCase(),
      body: isFormData ? body : JSON.stringify(body),
      headers: headers,
    });
    if (!res.ok) {
      const errorResponse = await res.json();
      throw new Error(
        `Error: ${res.status} ${res.statusText} - ${errorResponse.message || 'Unknown error'
        }`
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};
const generateRandomKey = (length: number) => {
  return crypto.randomBytes(length).toString('hex').slice(0, length);
};

export const saveFiles = async (file: Blob, folderName: string) => {
  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());

    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName, { recursive: true });
    }

    // Generate a unique file name with a random key
    const originalFileName = (file as File).name;
    const fileExtension = path.extname(originalFileName);
    const baseName = path.basename(originalFileName, fileExtension);

    // Generate a random key of specified length (e.g., 16 characters)
    const randomKey = generateRandomKey(4);
    const timestamp = Date.now(); // Current timestamp

    // Create a unique file name
    const uniqueFileName = `${baseName}-${timestamp}-${randomKey}${fileExtension}`;

    const filePath = path.resolve(folderName, uniqueFileName);

    try {
      await fs.promises.writeFile(filePath, buffer);

      let relativePath = filePath.split('public')[1];
      if (process.platform === 'win32') {
        relativePath = relativePath.replace(/\\/g, '/');
      }

      return relativePath;
    } catch (error) {
      throw new Error(`${error}`);
    }
  } else {
    return null;
  }
};

export async function getAudioDuration(audioBlob: Blob) {
  try {
    const arrayBuffer = await audioBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const metadata = await parseBuffer(buffer);

    const durationInSeconds: number | undefined = metadata.format.duration; // Duration is in seconds

    const minutes = Math.floor(durationInSeconds as number / 60);
    const seconds = Math.floor(durationInSeconds as number % 60);

    const formattedDuration = `${minutes}:${seconds
      .toString()
      .padStart(2, '0')}`;


    return formattedDuration;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Unable to extract audio duration: ' + error.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}


