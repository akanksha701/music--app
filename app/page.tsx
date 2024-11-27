import React from 'react';
import Marketing from './Dashboard/UI/Marketing';
import { useLazyFetchUserProfileQuery } from '@/services/user';

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
