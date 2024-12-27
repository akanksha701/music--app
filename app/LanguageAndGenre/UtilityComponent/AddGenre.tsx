"use client";
import { Button } from "@/components/ui/button";
import React from "react";
 
import NextInput from "@/common/inputs/Input";
import { useForm } from "react-hook-form";
import NextTextArea from "@/common/inputs/Textarea";
import FileUploadInput from "@/common/inputs/FileUploadInput";
import toast from "react-hot-toast";
import { fetchApi } from "@/utils/helpers";
import { Method } from "@/app/About/types/types";
import { IAddGenreProps } from "../types/types";
import { useAddGenreMutation } from "@/services/genre";
 
 

const AddGenre = (props: IAddGenreProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({});

  const [addGenre] = useAddGenreMutation()

  const onSubmit = async (data: any) => {

    props.handleCloseDialog()
    const formData = new FormData();
    formData.append('image', data.imageUrl);
    formData.append('name', data.name);
    formData.append('description', data.description);
    try {
      const Res = await addGenre(formData)
       console.log("Res :  " ,  Res )
    
      toast.success("Added...");
     
    } catch (error) {
      toast.error("Error while creating music");
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

          {/* Description Field */}
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

          {/* MultiSelect Grids */}
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
