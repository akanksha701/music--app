import { User, GoogleAuthProvider, signInWithPopup, onAuthStateChanged as _onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from './config';

export function onAuthStateChanged(callback: (_authUser: User | null) => void) {
  return _onAuthStateChanged(firebaseAuth, callback);
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(firebaseAuth, provider);

    if (!result || !result.user) {
      throw new Error('Google sign in failed');
    }

    return result.user.uid;
  } catch (error) {
    if(error instanceof Error){
      throw new Error('Error' , error);
    }
  }
}
export async function signOutWithGoogle() {
  try {
    await firebaseAuth.signOut();
  } catch (error) {
    if(error instanceof Error){
      throw new Error('Error' , error);  
    }
  }
}
