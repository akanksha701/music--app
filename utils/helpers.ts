"use server";
import path from "path";
import { Method } from "@/app/About/types/types";
import { Roles } from "../globals";
import { auth } from "@clerk/nextjs/server";
import { CalendarDate } from "@internationalized/date";
import cloudinary from "cloudinary";
import queryString from "query-string";
import fs from "fs";
import crypto from "crypto";
import { parseBuffer } from 'music-metadata';

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

export default async function checkRole(role: Roles) {
  const { sessionClaims } = await auth();
  return sessionClaims?.metadata.role === role;
}

export async function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function uploadImage(image: File) {
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
        upload_preset: process.env.NEXT_PUBLIC_UPLOAD_PRESET, // optional
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    stream.end(Buffer.from(buffer));
  });
}

export async function uploadAudio(audio: File) {
  if (audio.type !== 'audio/mpeg') {
    throw new Error('File must be an MP3 audio file.');
  }
  const buffer = await audio.arrayBuffer();

  return new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream(
      {
        resource_type: 'video', // 'video' is used for audio files in Cloudinary
        upload_preset: process.env.NEXT_PUBLIC_UPLOAD_PRESET,
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
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
  const url = new URL(apiUrl, process.env.APP_URL || 'http://localhost:3000');

  const isFormData = body instanceof FormData;

  const headers: HeadersInit = isFormData
    ? {}
    : { 'Content-Type': 'application/json' };

  headers["Authorization"] = `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImMwYTQwNGExYTc4ZmUzNGM5YTVhZGU5NTBhMjE2YzkwYjVkNjMwYjMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQXNoaXNoIFJhdGhvZCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMVjNVZDhhS2ZCUi1pV3NjUkl4YS1jVm1qNGxTS0luaE5fZVVTYXFQWm0wQnQ3bEE9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbXVzaWMtYXBwLWNkNWFjIiwiYXVkIjoibXVzaWMtYXBwLWNkNWFjIiwiYXV0aF90aW1lIjoxNzM2MzM4NTU5LCJ1c2VyX2lkIjoibWQ2VEFpSzZucFZBRkY0WGdLZmVKakJrRFdyMiIsInN1YiI6Im1kNlRBaUs2bnBWQUZGNFhnS2ZlSmpCa0RXcjIiLCJpYXQiOjE3MzYzMzg1NTksImV4cCI6MTczNjM0MjE1OSwiZW1haWwiOiJhc2hpc2gucmF0aG9kQHVwZm9yY2UudGVjaCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTE1Njc0MTg0MzgxNjY0NDQ5MjI4Il0sImVtYWlsIjpbImFzaGlzaC5yYXRob2RAdXBmb3JjZS50ZWNoIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.XKd0Hq_4xBD2pmSo3ln4ODtNo469qd3SmqByZCb8cm8wfRV8UeMsd0sr8PMbUEMupq4kgZF8QxTDJw5VJkl9w_gRjf_lsBhygJlgcEdajZedO-bd9Sn-wKkvnxHIvTbm4XYqHhJLVbuMGqzGA9BMbJ-SUGAzByGkBQOIMoXCIM9pBmbZcNjXoYQ8AwhQcPu5EpLQanivbpQjvdn-QwXnJdI2hMfiP-ZgbZFzH4eSEYNwwYwqV9lMLyQJNJY4h2BY_YppcrZ6dVQiOTxfi5F_ibt3Kefqq8NFt-Jg26pC2vfIwHvIbQJ-0RVVps2qZAXb99utsh2ZGNdB-GrMJEHFcA`;
  try {
    const res = await fetch(url.toString(), {
      method: method.toUpperCase(),
      body: isFormData ? body : JSON.stringify(body),
      headers: headers,
    });

    if (!res.ok) {
      const errorResponse = await res.json();
      throw new Error(
        `Error: ${res.status} ${res.statusText} - ${errorResponse.message || "Unknown error"
        }`
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
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
      // Adjust for Windows path separators
      if (process.platform === 'win32') {
        relativePath = relativePath.replace(/\\/g, '/');
      }
      console.log("relativePath  : ", relativePath)

      return relativePath;
    } catch (err) {
      console.error('Error saving the file:', err);
      return null;
    }
  } else {
    return null;
  }
};

export async function getAudioDuration(audioBlob: Blob): Promise<string> {
  try {
    // Convert Blob to Buffer
    const arrayBuffer = await audioBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const metadata = await parseBuffer(buffer);

    const durationInSeconds: any = metadata.format.duration; // Duration is in seconds

    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);

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


