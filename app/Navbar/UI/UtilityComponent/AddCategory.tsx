import NextInput from "@/common/inputs/Input";
import NextTextArea from "@/common/inputs/Textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectItem } from "@nextui-org/react";
import React from "react";
import { useForm } from "react-hook-form";
const AddCategory = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({});
  const onSubmit = handleSubmit(async (data) => {
    try {
    } catch (error) {
      console.error("Error submitting form", error);
    }
  });

  return (
    <div>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className=" flex flex-row items-center space-x-4">
          <Label htmlFor="name" className="w-24">
            Name
          </Label>
          <div className="w-full">
            <NextInput
              label="Name"
              id="genreName"
              name="genreName"
              register={register}
              required
              placeholder="Enter your genre name"
              errors={errors}
              options={{ required: "Name is required" }}
            />
          </div>
        </div>
        <div className=" flex flex-row items-center space-x-4">
          <Label htmlFor="name" className="w-24">
            Description
          </Label>
          <div className="w-full">
            <NextTextArea
              label="Description"
              id="description"
              name="description"
              register={register}
              required
              placeholder="Enter your description"
              errors={errors}
              options={{ required: "Description is required" }}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-blue-600 text-white  px-4 rounded-md shadow-md hover:bg-blue-700"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
