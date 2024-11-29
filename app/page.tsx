import React from 'react';
import { useLazyFetchUserProfileQuery } from '@/services/user';
import Marketing from './Home/UI/Marketing';

const Page = () => {
  // const [fetchUserProfile, { data: user, error, isLoading }] = useLazyFetchUserProfileQuery({});
  // const handleFetchUserProfile = () => {
  //   fetchUserProfile(); 
  // };
  // console.log(user);
 
  return (
    <div>
      <Marketing />
    </div>
  );
};

export default Page;
