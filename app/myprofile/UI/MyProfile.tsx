'use client';
import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import AvatarUploader from '@/common/inputs/avatar-uploader';
import { useForm } from 'react-hook-form';
import Loading from '@/app/loading';
import EditProfile from './UtilityComponent/EditProfile';


const MyProfile = () => {
  const { isLoaded, isSignedIn } = useUser();
  const { setValue } = useForm({});
  const [image, setImage] = useState('');
  
  
  if (!isLoaded || !isSignedIn) {
    return (
      <>
        <Loading />
      </>
    );
  }


  return (
    <div className="bg-gray-100 flex flex-col justify-center bg-cover bg-mk-bg p-6">
      <div className="w-full sm:max-w-xl sm:mx-auto">
        <div className="bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="block relative">
                <AvatarUploader
                  onChange={(url) => {
                    setImage(url as string);
                    setValue('imageUrl', url as string);
                  }}
                  value={image}
                />
              </div>
              <div className="block pl-2 font-semibold text-xl text-gray-700">
                <h2 className="leading-relaxed">Edit Profile</h2>
                <p className="text-sm text-gray-500 font-normal">
                  Update your personal details here
                </p>
              </div>
            </div>
            <EditProfile setImage={setImage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
