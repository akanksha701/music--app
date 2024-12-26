import { SignUp } from '@clerk/nextjs';
import React from 'react';

export default function Page() {
  return <div className="flex justify-center items-center h-screen">
    <div className="w-full max-w-md p-6">
      <SignUp signInFallbackRedirectUrl="/" />
    </div>
  </div>;

}