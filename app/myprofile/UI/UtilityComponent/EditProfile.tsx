import NextInput from '@/common/inputs/Input';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useFetchUserDetails from '@/hooks/customHooks/useFetchUserDetails';
import { CalendarDate } from '@internationalized/date';
import Loading from '@/app/loading';
import { UserData } from '@clerk/types';
import NextDatePicker from '@/common/inputs/DatePicker';
import SelectMenu from '@/common/inputs/SelectMenu';
import { fetchApi } from '@/utils/helpers';
import { IEditProfileProps, IUserDetails } from '../../types/types';
import toast from 'react-hot-toast';

const EditProfile = (props: IEditProfileProps) => {
  // const userDetails = useSelector((state: RootState) => state?.userReducer?.userDetails);
  const { setImage } = props;
  const [user, setUser] = useState<IUserDetails>();
  useFetchUserDetails(setUser);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({});

  const setUserDetails = useCallback(() => {
    {
      if (user) {
        const dob = (user?.unsafeMetadata as IUserDetails)?.dob;
        const day = dob?.day || new Date().getDate();
        const year = dob?.year || new Date().getFullYear();
        const month = dob?.month || new Date().getMonth();
        const date = new CalendarDate(year, month, day);
        setValue('userId', user?.id);
        setValue('firstName', user?.firstName);
        setValue('lastName', user?.lastName);
        setValue('gender', user?.unsafeMetadata.gender);
        setValue('dob', date);
        setValue('imageUrl', user?.unsafeMetadata?.imageUrl);
        setValue('emailAddresses', user?.emailAddresses[0].emailAddress);
        setImage(user?.unsafeMetadata?.imageUrl as string);
      }
    }
  }, [user]);

  useEffect(() => {
    setUserDetails();
  }, [user]);

  const onSubmit = async (data: UserData) => {
    try {
      const response = await fetchApi('/api/user', 'POST', data);
      if (response.status === 200) {
        toast.success('profile updated successfully');
      }
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  if (!user) {
    return <Loading />;
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="divide-y divide-gray-200"
      >
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
              options={{ required: 'First name is required' }}
            />
          </div>

          <div className="flex flex-col">
            <NextInput
              label="Last Name"
              id="lastName"
              register={register}
              required
              placeholder="Enter your last name"
              errors={errors}
              options={{ required: 'Last name is required' }}
            />
          </div>

          <div className="flex flex-col">
            <NextInput
              disabled={true}
              label="Email"
              id="emailAddresses"
              type="email"
              register={register}
              required
              placeholder="Enter your email address"
              errors={errors}
              options={{
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              }}
            />
          </div>

          <div className="flex flex-col">
            <NextDatePicker
              name="dob"
              label="Date of Birth"
              control={control}
              rules={{ required: 'Date of birth is required' }}
              error={errors.dob?.message}
            />
          </div>

          <div className="flex flex-col">
            <SelectMenu
              name="gender"
              label="Select Gender"
              control={control}
              rules={{ required: 'Gender is required' }}
              error={errors.gender?.message as string}
              items={[
                { id: 'male', name: 'Male' },
                { id: 'female', name: 'Female' },
                { id: 'other', name: 'Other' },
              ]}
            />
          </div>
        </div>
        <div className="pt-4 flex items-center space-x-4">
          <button
            type="submit"
            className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default EditProfile;