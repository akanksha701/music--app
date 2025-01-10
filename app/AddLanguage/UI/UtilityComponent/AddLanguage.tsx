'use client';
import { Button } from '@/components/ui/button';
import React from 'react';
import NextInput from '@/common/inputs/Input';
import { useForm, SubmitHandler } from 'react-hook-form';
import NextTextArea from '@/common/inputs/Textarea';
import toast from 'react-hot-toast';
import { fetchApi } from '@/utils/helpers';
import { Method } from '@/app/About/types/types';
interface ILanguageFormData {
  name: string;
  description: string;
  imageUrl: string; 
}

const AddLanguage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ILanguageFormData>();
  const onSubmit: SubmitHandler<ILanguageFormData> = async (data) => {
    try {
      const res = await fetchApi('/api/language', Method.POST, data);
      if (res.status === 200) {
        toast.success(res.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error?.message);
      } else {
        toast.error('unknown error occurred');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 p-6 bg-white rounded-lg shadow-lg w-full sm:w-[800px] md:w-[900px] 
        lg:w-[600px] max-w-full mx-2 sm:mx-4"
      >
        <div className="flex flex-col w-full space-y-6">
          <div className="flex flex-col">
            <NextInput
              id="name"
              name="name"
              label="Name"
              placeholder="Enter language name"
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
              placeholder="Enter language description"
              register={register}
              options={{ required: 'Description is required' }}
              errors={errors}
            />
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

export default AddLanguage;
