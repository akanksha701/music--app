import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { CalendarDate } from "@internationalized/date";
import { IEditProfileProps } from "../../types/types";
import toast from "react-hot-toast";
import {
  useFetchUserProfileQuery,
  useUpdateUserProfileMutation,
} from "@/services/user";
import Button from "@/common/buttons/Button";
import NextInput from "@/common/inputs/Input";
import NextDatePicker from "@/common/inputs/DatePicker";
import SelectMenu from "@/common/inputs/SelectMenu";
import Loading from "@/app/loading";

const EditProfile = (props: IEditProfileProps) => {
  const { setImage, image } = props;
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({});
  const { data, isLoading, isError } = useFetchUserProfileQuery({});
  const setUserDetails = useCallback(async () => {
    {
      const user = data?.data;
      if (user) {
        const day = ( new Date(user.dateOfBirth).getDate()) || new Date().getDate();
        const month = ( new Date(user.dateOfBirth).getMonth()) || new Date().getMonth();
        const year = ( new Date(user.dateOfBirth).getFullYear()) || new Date().getFullYear();
        const calendarDate =  new CalendarDate(year, month+1, day-1);
        setValue("userId", user?.userId);
        setValue("firstName", user?.firstName);
        setValue("lastName", user?.lastName);
        setValue("gender", user?.gender);
        setValue("dob", calendarDate);
        setValue("imageUrl", user?.imageUrl);
        setValue("emailAddresses", user.email);
        setImage(user?.imageUrl as string);
      }
    }
  }, [data]);

  useEffect(() => {
    setUserDetails();
  }, [data]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await updateUserProfile(data).unwrap();

      if (response.status === 200) {
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      toast.error("Failed to update profile");
    }
  });

  if (!data) {
    return <Loading />;
  }
  return (
    <>
      <form onSubmit={onSubmit} className="divide-y divide-gray-200">
        <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
          <div className="flex flex-col">
            <NextInput
              label="First Name"
              id="firstName"
              name="firstName"
              register={register}
              required
              placeholder="Enter your first name"
              errors={errors}
              options={{ required: "First name is required" }}
            />
          </div>

          <div className="flex flex-col">
            <NextInput
              label="Last Name"
              name="Last Name"
              id="lastName"
              register={register}
              required
              placeholder="Enter your last name"
              errors={errors}
              options={{ required: "Last name is required" }}
            />
          </div>

          <div className="flex flex-col">
            <NextInput
              name="Email"
              disabled={true}
              label="Email"
              id="emailAddresses"
              type="email"
              register={register}
              required
              placeholder="Enter your email address"
              errors={errors}
              options={{
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              }}
            />
          </div>

          <div className="flex flex-col">
            <NextDatePicker
              name="dob"
              label="Date of Birth"
              register={register}
              control={control}
              rules={{ required: "Date of birth is required" }}
              error={errors.dob?.message as any}
            />
          </div>

          <div className="flex flex-col">
            <SelectMenu
              selectionMode={"multiple"}
              name="gender"
              placeholder="select gender"
              label="Select Gender"
              control={control}
              rules={{ required: "Gender is required" }}
              error={errors.gender?.message as any}
              items={[
                { id: "male", name: "Male" },
                { id: "female", name: "Female" },
                { id: "other", name: "Other" },
              ]}
            />
          </div>
        </div>
        <div className="pt-4 flex items-center space-x-4">
          <Button type="submit" name="Save" />
        </div>
      </form>
    </>
  );
};

export default EditProfile;
