"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { IAddMusicProps } from "../../types/types";
import NextInput from "@/common/inputs/Input";
import { useForm } from "react-hook-form";
import NextTextArea from "@/common/inputs/Textarea";
import MultiSelect from "@/common/inputs/multiSelect";

const Addmusic = (props: IAddMusicProps) => {
  const { genreList, languageList } = props;
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({});

  const onSubmit = (data: any) => {
    console.log(data);
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
          <MultiSelect
            control={control}
            name="selectedArtists"
            label="Choose Artists"
            items={[
              { id: "1", name: "Item 1" },
              { id: "2", name: "Item 2" },
              { id: "3", name: "Item 3" },
            ]}
            error={errors}
            rules={{ required: true }}
            selectionMode={"multiple"}
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
