import {
  type User,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
} from "firebase/auth";

import { redirect } from "next/navigation";
import { db } from "@/app/api/user/route";
import { firebaseAuth } from "./firebase/config";
import { checkIfUserExists } from "./firebase/userActions";

export async function onAuthStateChanged(
  callback: (authUser: User | null) => void
) {
  return _onAuthStateChanged(firebaseAuth, callback);
}

export async function signInWithGoogle(): Promise<string | null> {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(firebaseAuth, provider);
    if (!result || !result.user) {
      throw new Error("Google sign-in failed");
    }
    const user = result.user;
    return user.uid;
  } catch (error) {
    console.error("Error signing in with Google", error);
    return null;
  }
}

export const saveUser = async (user: any | null) => {
  if (user) {
    const name = user?.reloadUserInfo.displayName.split(" ");
    const photo = user?.reloadUserInfo?.photoUrl;
    const userDetails = {
      uid: user?.uid,
      firstName: name[0],
      lastName: name[1],
      email: user?.email,
      imageUrl: user?.reloadUserInfo?.photoUrl,
    };
    await checkIfUserExists(userDetails);
  }
};

export { User };
