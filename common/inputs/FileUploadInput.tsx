import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Input, Image } from "@nextui-org/react";
import { IFileUploadProps } from "../types/types"; // Make sure IFileUploadProps is defined correctly

const FileUploadInput = ({
  name,
  control,
  label,
  accept,
  validationRules,
  ...rest
}: IFileUploadProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Handle file change and preview
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, onChange: any) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;

    // Set preview image if the file exists
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setImagePreview(fileReader.result as string);
      };
      fileReader.readAsDataURL(selectedFile);
    } else {
      setImagePreview(null);
    }

    // Call React Hook Form's onChange to update the form state
    if (onChange && selectedFile) {
      onChange(selectedFile); // Update the form state with the selected file
    }
  };

  return (
    <div>
      {/* Render label if provided */}
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-900">
          {label}
        </label>
      )}

      {/* File upload input with React Hook Form Controller */}
      <Controller
        name={name}
        control={control}
        rules={validationRules} // Apply validation rules here
        render={({ field, fieldState }) => (
          <div>
            <Input
              {...field}
              type="file"
              id={name}
              name={name}
              accept={accept}
              onChange={(e) => handleFileChange(e, field.onChange)} // Handle file change and update form state
              value={undefined} // Clear the value to allow file re-upload
              style={{
                borderColor: fieldState?.error ? "red" : undefined,
                borderWidth: fieldState?.error ? "2px" : undefined,
              }}
            />
            {/* Display validation error */}
            {fieldState?.error && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {fieldState?.error?.message}
              </span>
            )}
          </div>
        )}
      />

      <div style={{ marginTop: 10 }}>
        {imagePreview && (
          <Image
            alt="File Preview"
            width={200}
            height={200}
            src={imagePreview} 
          />
        )}
      </div>
    </div>
  );
};

export default FileUploadInput;
