"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { IAddLanguageProps } from "../../types/types";
import NextInput from "@/common/inputs/Input";
import { useForm } from "react-hook-form";
import NextTextArea from "@/common/inputs/Textarea";
import MultiSelect from "@/common/inputs/MultiSelect";
import FileUploadInput from "@/common/inputs/FileUploadInput";
import toast from "react-hot-toast";
import { fetchApi } from "@/utils/helpers";
import { Method } from "@/app/About/types/types";

const AddLanguage = (props: IAddLanguageProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({});

  const onSubmit = async (data: any) => {
    try {
      const res = await fetchApi("/api/language", Method.POST, data);
      if (res.status === 200) {
        toast.success(res.message);
      }
    } catch (error) {
      toast.error("Error while creating language");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
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
              options={{ required: "Name is required" }}
              errors={errors}
            />
          </div>

          {/* Description Field */}
          <div className="flex flex-col">
            <NextTextArea
              id="description"
              name="description"
              label="Description"
              placeholder="Enter music description"
              register={register}
              options={{ required: "Description is required" }}
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
