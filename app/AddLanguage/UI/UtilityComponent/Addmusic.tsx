"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { IAddMusicProps } from "../../types/types";
import NextInput from "@/common/inputs/Input";
import { useForm } from "react-hook-form";
import NextTextArea from "@/common/inputs/Textarea";
import MultiSelect from "@/common/inputs/MultiSelect";
import FileUploadInput from "@/common/inputs/FileUploadInput";
import toast from "react-hot-toast";
import { fetchApi } from "@/utils/helpers";
import { Method } from "@/app/About/types/types";

const Addmusic = (props: IAddMusicProps) => {
  const { genreList, languageList, artistList, albumList } = props;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({});

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("audio", data.audioUrl);
    formData.append("image", data.imageUrl);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("language", data.language);
    formData.append("genre", data.genre);
    formData.append("artists", data.artists);
    formData.append("album", data.album);
    try {
      const res = await fetchApi("/api/music", Method.POST, formData);
      if (res.status === 200) {
        toast.success(res.message);
      }
    } catch (error) {
      toast.error("Error while creating music");
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

          {/* MultiSelect Grids */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <MultiSelect
                control={control}
                name="language"
                label="Choose Language"
                items={languageList.map((language) => ({
                  id: language._id,
                  name: language.name,
                }))}
                error={errors}
                rules={{ required: true }}
                selectionMode={"single"}
                placeholder="Select Language"
              />
            </div>
            <div className="flex flex-col">
              <MultiSelect
                control={control}
                name="genre"
                label="Choose Genre"
                items={genreList.map((genre) => ({
                  id: genre._id,
                  name: genre.name,
                }))}
                error={errors}
                rules={{ required: true }}
                selectionMode={"single"}
                placeholder="Select Genre"
              />
            </div>
            <div className="flex flex-col">
              <MultiSelect
                control={control}
                name="artists"
                label="Choose Artists"
                items={artistList.map((artist) => ({
                  id: artist.id,
                  name: artist.fullname,
                }))}
                error={errors}
                rules={{ required: true }}
                selectionMode={"multiple"}
                placeholder="Select Artists"
              />
            </div>
            <div className="flex flex-col">
              <MultiSelect
                control={control}
                name="album"
                label="Choose Albums"
                items={albumList.map((album) => ({
                  id: album._id,
                  name: album.name,
                }))}
                error={errors}
                rules={{ required: true }}
                selectionMode={"multiple"}
                placeholder="Select Album"
              />
            </div>
            <div className="flex flex-col">
              <FileUploadInput
                name="audioUrl"
                control={control}
                label="Upload an MP3"
                accept="audio/mp3, audio/mpeg, .mp3" // Accepts MP3 files
              />
            </div>
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

export default Addmusic;