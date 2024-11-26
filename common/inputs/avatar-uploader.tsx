"use client";
import React from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { ImageUploadProps } from "../types/types";

declare global {
  var cloudinary: string;
}

const AvatarUploader = ({ onChange, value }: ImageUploadProps) => {
  return (
    <CldUploadWidget
      onSuccess={(result: any) => {
        onChange(result.info.secure_url);
      }}
      uploadPreset="upload_images"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => (
        <div
          onClick={() => open?.()}
          className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer hover:opacity-70 transition"
        >
          {value ? (
            <Image
              alt="Uploaded Avatar"
              fill
              style={{ objectFit: "cover" }}
              src={value}
            />
          ) : (
            <div className="flex items-center justify-center h-full w-full text-neutral-600">
              <span className="text-2xl">+</span>{" "}
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default AvatarUploader;
