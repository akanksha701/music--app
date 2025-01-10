import React, { useState } from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { Input, Image } from '@nextui-org/react';
import { IFileUploadProps } from '../types/types'; // Import the IFileUploadProps

const FileUploadInput = <T extends FieldValues>({
  name,
  control,
  label,
  accept,
  validationRules
}: IFileUploadProps<T>) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (selectedFile: File) => void
  ) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;

    if (selectedFile) {
      const fileReader = new FileReader();

      const type = selectedFile.type;
      setFileType(type);

      if (type.startsWith('image/')) {
        fileReader.onloadend = () => {
          setImagePreview(fileReader.result as string);
        };
        fileReader.readAsDataURL(selectedFile);
      } else {
        setImagePreview(null);
      }
    } else {
      setImagePreview(null); 
      setFileType(null);
    }

    // Update form state with the selected file
    if (onChange && selectedFile) {
      onChange(selectedFile);
    }
  };

  let content;

  if (imagePreview && fileType?.startsWith('image/')) {
    content = (
      <Image
        alt="File Preview"
        width={100}
        height={100}
        src={imagePreview}
        className="rounded-full object-cover"
      />
    );
  } else if (fileType?.startsWith('audio/')) {
    content = <span className="text-gray-500">Audio File</span>;
  } else {
    content = <span className="text-gray-500">Upload</span>;
  }

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
                ${fileType?.startsWith('image/')
            ? 'w-32 h-32 rounded-full'
            : 'w-32 h-32 border-2'
          } 
                border-dashed border-gray-300 flex items-center justify-center cursor-pointer
              `}
              style={{
                backgroundColor: imagePreview ? 'transparent' : '#f1f5f9',
              }}
            >
              {content}
            </div>

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
