"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectItem } from "@nextui-org/react";
import React from "react";
import { IAddMusicProps } from "../../types/types";
import NextInput from "@/common/inputs/Input";
import { useForm } from "react-hook-form";
import NextTextArea from "@/common/inputs/Textarea";
import SelectMenu from "@/common/inputs/SelectMenu";
const Addmusic = (props: IAddMusicProps) => {
  const { genreList, languageList } = props;
  // const [image, setImage] = useState<File | null>(null);
  // const [imagePreview, setImagePreview] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({});
  // Handle file change event
  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     // Set the selected image file
  //     setImage(file);

  //     // Generate a preview URL for the selected image
  //     const previewUrl = URL.createObjectURL(file);
  //     setImagePreview(previewUrl);
  //   }
  // };
  const onSubmit = (data: any) => {
    console.log(data); // Process the form data (imageUrl, audioFile, etc.)
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 p-6 bg-white rounded-lg shadow-lg w-[600px]"
      >
        <div className="flex flex-col">
          <NextInput
            id="name"
            name="name"
            label="Name"
            placeholder="Enter your name"
            register={register}
            options={{ required: "name is required" }}
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
            options={{ required: "description is required" }}
            errors={errors}
          />
        </div>
        <div className="flex flex-col">
          <SelectMenu
            selectionMode='multiple'
            name="gender"
            label="Select Gender"
            control={control}
            rules={{ required: "Gender is required" }}
            error={errors.gender?.message as string}
            items={[
              { id: "male", name: "Male" },
              { id: "female", name: "Female" },
              { id: "other", name: "Other" },
            ]}
          />
        </div>
        {/* <div className="flex flex-col">
          <Label className="w-24">Genre</Label>
          <Select className="p-2 border rounded-md shadow-sm w-full">
            {genreList &&
              genreList.map((genre, index) => (
                <SelectItem key={genre._id} value={genre.name}>
                  {genre.name}
                </SelectItem>
              ))}
          </Select>
        </div> */}
        {/* <div className="flex items-center space-x-4">
          <Label className="w-24">Language</Label>
          <Select className="p-2 border rounded-md shadow-sm w-full">
            {languageList.map((language) => (
              <SelectItem key={language._id} value={language._id}>
                {language.name}
              </SelectItem>
            ))}
          </Select>
        </div> */}
        {/* <div className="flex items-center space-x-4">
          <Label className="w-24">Artists</Label>
          <Select
            selectionMode="multiple"
            className="p-2 border rounded-md shadow-sm w-full"
          >
            {languageList.map((language) => (
              <SelectItem key={language._id} value={language._id}>
                {language.name}
              </SelectItem>
            ))}
          </Select>
        </div> */}
        {/* <div className="flex items-center space-x-4">
          <Label className="w-24">Audio File</Label>
          <Input
            type="file"
            id="audioFile"
            name="audioFile"
            accept="audio/*"
            className="p-2 border rounded-md shadow-sm w-full"
          />
        </div> */}

        {/* <div className="flex items-center space-x-4">
          <Label htmlFor="imageUrl" className="w-24">
            Image Upload
          </Label>
          <Input
            type="file"
            id="imageUrl"
            name="imageUrl"
            accept="image/*"
            className="p-2 border rounded-md shadow-sm w-full"
          />
        </div> */}

        {/* {imagePreview && (
          <div className="mt-4">
            <p className="font-medium text-gray-700">Image Preview:</p>
            <img
              src={imagePreview}
              alt="Selected image preview"
              className="w-48 h-48 object-cover mt-2 rounded-md shadow-md"
            />
          </div>
        )} */}

        <div className="flex justify-center">
          <Button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Addmusic;
