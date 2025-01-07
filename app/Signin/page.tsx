"use client";
import React from "react";
import { createSession } from "../actions/auth";
import { signInWithGoogle } from "@/lib/firebase/auth";
import { checkIfUserExists, createUser } from "@/lib/firebase/userActions";

const Page = () => {
  const handleSignIn = async () => {
    try {
      const userUid = await signInWithGoogle();
      await createSession(userUid as string);
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <button onClick={handleSignIn}>Sign In with google</button>
    </div>
  );
};

export default Page;
