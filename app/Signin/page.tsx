'use client';
import React from 'react';
import { createSession } from '../actions/auth';
import { signInWithGoogle } from '@/lib/firebase/auth';
import { FcGoogle } from 'react-icons/fc';
const Page = () => {
  const handleSignIn = async () => {
    const userUid = await signInWithGoogle();
    await createSession(userUid as string);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <button
        onClick={handleSignIn}
        className="flex items-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
      >
        <FcGoogle className="mr-3 text-2xl" /> {/* Google icon */}
      Sign In with Google
      </button>
    </div>
  );
};

export default Page;
