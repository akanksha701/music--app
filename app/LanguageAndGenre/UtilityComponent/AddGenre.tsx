'use client';
import { Button } from '@/components/ui/button';
import React from 'react';
import NextInput from '@/common/inputs/Input';
import { useForm } from 'react-hook-form';
import NextTextArea from '@/common/inputs/Textarea';
import FileUploadInput from '@/common/inputs/FileUploadInput';
import toast from 'react-hot-toast';
import { fetchApi } from '@/utils/helpers';
import { Method } from '@/app/About/types/types';
import { IMusicProps } from '@/app/(BrowsePage)/Browse/types/types';
const AddGenre = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({});
  const onSubmit = async (data: IMusicProps) => {
    const formData = new FormData();
    formData.append('image', data.imageUrl as string);
    formData.append('name', data.name as string);
    formData.append('description', data.description as string);
    try {
      const res = await fetchApi('/api/genre', Method.POST, formData);
      if (res.status === 200) {
        toast.success(res.message); 
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error?.message as string);
      } else {
        toast.error('unknown error occured');
      }
    }
  };

  return (
    <div className=" text-black">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 p-6 bg-white rounded-lg shadow-lg w-full sm:w-[800px] md:w-[900px] lg:w-[600px] max-w-full mx-2 sm:mx-4"
      >
        <div className="flex flex-col w-full space-y-6">
          <div className="flex flex-col">
            <NextInput
              id="name"
              name="name"
              label="Name"
              placeholder="Enter your name"
              register={register}
              options={{ required: 'Name is required' }}
              errors={errors}
            />
          </div>
          <div className="flex flex-col">
            <NextTextArea
              id="description"
              name="description"
              label="Description"
              placeholder="Enter music description"
              register={register}
              options={{ required: 'Description is required' }}
              errors={errors}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <FileUploadInput
                name="imageUrl"
                control={control}
                label="Upload an Image"
                accept="image/png, image/jpeg"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center sm:justify-start mt-4">
            <Button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-700"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddGenre;
