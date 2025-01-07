import {
  type User,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged as _onAuthStateChanged,
} from "firebase/auth";

import { redirect } from "next/navigation";
import { db } from "@/app/api/user/route";
import { firebaseAuth } from "./firebase/config";


export async function onAuthStateChanged(callback: (authUser: User | null) => void) {
  return _onAuthStateChanged(firebaseAuth, callback);
}


export async function signInWithGoogle(): Promise<string | null> {
  const provider = new GoogleAuthProvider();

  try {
    // Perform Google sign-in
    const result = await signInWithPopup(firebaseAuth, provider);
    if (!result || !result.user) {
      throw new Error("Google sign-in failed");
    }

    const user = result.user;

    const userExists = await checkIfUserExists(user.uid);

    if (!userExists) {
      const newUser = await createUser(user);
      if (newUser) {
        console.log("New user created successfully in the database");
        redirect("/Browse");
      } else {
        console.error("Error creating new user in MongoDB");
      }
    } else {
      console.log("User already exists in the database");
      redirect("/Browse");
    }

    return user.uid;
  } catch (error) {
    console.error("Error signing in with Google", error);
    return null;
  }
}


async function createUser(user: User) {
  try {
    const nameParts = user.displayName?.split(" ") || ["", ""]; // Split the name into first and last
    const firstName = nameParts[0];
    const lastName = nameParts[1];

    // Create a new user in MongoDB
    const newUser = await db.collection("users").insertOne({
      userId: user.uid,
      firstName,
      lastName,
      email: user.email,
      isActive: true,
      isDeleted: false,
    });

    return newUser; 
  } catch (error) {
    console.error("Error creating user in MongoDB", error);
    return null;
  }
}


async function checkIfUserExists(uid: string): Promise<boolean> {
  try {
    const user = await db.collection("users").findOne({ userId: uid });
    return user ? true : false; // Return true if the user exists, otherwise false
  } catch (error) {
    console.error("Error checking user existence", error);
    return false; 
  }
}


export async function signOutWithGoogle() {
  try {
    await firebaseAuth.signOut();
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}

export { User };
