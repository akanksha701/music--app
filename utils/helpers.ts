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
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
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

export async function getCalendarDate(date: any) {
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

export async function uploadImage(image: any) {
  cloudinary.v2.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const buffer = await image.arrayBuffer();

  return new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream(
      {
        resource_type: "auto",
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

export async function uploadAudio(audio: any) {
  if (audio.type !== "audio/mpeg") {
    throw new Error("File must be an MP3 audio file.");
  }
  const buffer = await audio.arrayBuffer();

  return new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream(
      {
        resource_type: "video", // 'video' is used for audio files in Cloudinary
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
  const url = new URL(apiUrl, process.env.APP_URL || "http://localhost:3000");

  const isFormData = body instanceof FormData;

  const headers: HeadersInit = isFormData
    ? {}
    : { "Content-Type": "application/json" };

  try {
    const res = await fetch(url.toString(), {
      method: method.toUpperCase(),
      body: isFormData ? body : JSON.stringify(body),
      headers: headers,
    });

    if (!res.ok) {
      const errorResponse = await res.json();
      throw new Error(
        `Error: ${res.status} ${res.statusText} - ${
          errorResponse.message || "Unknown error"
        }`
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
const generateRandomKey = (length: number) => {
  return crypto.randomBytes(length).toString("hex").slice(0, length);
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
      console.log("File saved to:", filePath.split("public")[1]);

      let relativePath = filePath.split("public")[1];
      // Adjust for Windows path separators
      if (process.platform === "win32") {
        relativePath = relativePath.replace(/\\/g, "/");
      }
      console.log("relativePath  : " , relativePath)

      return relativePath;
    } catch (err) {
      console.error("Error saving the file:", err);
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
    
    const durationInSeconds:any = metadata.format.duration; // Duration is in seconds
    
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    
    const formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    console.log("Formatted Duration:", formattedDuration);

    return formattedDuration;
  } catch (error:any) {
    throw new Error('Unable to extract audio duration: ' + error.message);
  }
}

