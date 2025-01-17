
import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import { firebaseAuth } from './firebase/config';
import { checkIfUserExists } from './firebase/userActions';
import { IUserDetails } from '@/app/xyz/types/types';

export async function onAuthStateChanged(
  firebaseAuth: unknown, callback: (authUser: User | null) => void) {
  return onAuthStateChanged(firebaseAuth, callback);
}

export async function signInWithGoogle(): Promise<string | null> {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(firebaseAuth, provider);
    if (!result || !result.user) {
      throw new Error('Google sign-in failed');
    }
    const user = result.user;
    return user.uid;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message); 
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

export const saveUser = async (user: IUserDetails | null) => {
  if (user) {
    const userData=  await checkIfUserExists(user);
    return userData;
  }
};

export type { User };
