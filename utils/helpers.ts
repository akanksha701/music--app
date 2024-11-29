"use server";
import { Roles } from "../globals";
import { auth } from "@clerk/nextjs/server";
import { UserData } from "@clerk/types";
import cloudinary from "cloudinary";
import { NextResponse } from "next/server";

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
  method: string,
  body?: object
) => {
  const url = new URL(apiUrl, process.env.APP_URL || "http://localhost:3000");
  try {
    const res = await fetch(url.toString(), {
      method: method.toUpperCase(),
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
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
    console.error("Error fetching user data:", error);
    throw error;
  }
};
