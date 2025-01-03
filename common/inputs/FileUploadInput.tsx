import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Input, Image } from "@nextui-org/react";
import { IFileUploadProps } from "../types/types"; // Ensure this interface is correct

const FileUploadInput = ({
  name,
  control,
  label,
  accept,
  validationRules,
  ...rest
}: IFileUploadProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (selectedFile: File) => void
  ) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;

    // If a file is selected, generate the image preview and check the file type
    if (selectedFile) {
      const fileReader = new FileReader();

      // Check file type to determine if it's an image or audio
      const type = selectedFile.type;
      setFileType(type);

      if (type.startsWith("image/")) {
        // If the file is an image, create a preview
        fileReader.onloadend = () => {
          setImagePreview(fileReader.result as string);
        };
        fileReader.readAsDataURL(selectedFile);
      } else {
        // If it's not an image, clear the preview (you could show an icon or something else if desired)
        setImagePreview(null);
      }
    } else {
      setImagePreview(null); // Reset preview if no file is selected
      setFileType(null);
    }

    // Update form state with the selected file
    if (onChange && selectedFile) {
      onChange(selectedFile);
    }
  };

  return (
    <div className="file-upload-input">
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-900">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        rules={validationRules}
        render={({ field, fieldState }) => (
          <div className="relative">
            {/* The container for the upload input */}
            <div
              className={`
                ${
                  fileType?.startsWith("image/")
                    ? "w-32 h-32 rounded-full"
                    : "w-32 h-32 border-2"
                } 
                border-dashed border-gray-300 flex items-center justify-center cursor-pointer
              `}
              style={{
                backgroundColor: imagePreview ? "transparent" : "#f1f5f9",
              }}
            >
              {imagePreview && fileType?.startsWith("image/") ? (
                <Image
                  alt="File Preview"
                  width={100}
                  height={100}
                  src={imagePreview}
                  className="rounded-full object-cover"
                />
              ) : fileType?.startsWith("audio/") ? (
                <span className="text-gray-500">Audio File</span>
              ) : (
                <span className="text-gray-500">Upload</span> // Default text when no file is selected
              )}
            </div>

            {/* Hidden file input */}
            <Input
              {...field}
              type="file"
              id={name}
              name={name}
              accept={accept}
              onChange={(e) => handleFileChange(e, field.onChange)} // Handle file change and update form state
              value={undefined} // Clear the value to allow file re-upload
              className="absolute inset-0 opacity-0 cursor-pointer" // Make the input invisible
            />

            {fieldState?.error && (
              <span className="text-red-500 text-xs">
                {fieldState?.error?.message}
              </span>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default FileUploadInput;
