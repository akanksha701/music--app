'use client';
import React from 'react';
import { SignIn } from '@clerk/nextjs';
const Page = () => {
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <SignIn routing='hash' signUpForceRedirectUrl={'/'} />
    </div>
  );
};

export default Page;
