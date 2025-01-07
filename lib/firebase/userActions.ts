'use server'
import { db } from "@/app/api/user/route";
import { User } from "firebase/auth";

export async function createUser(user: User | null) {
  try {
    console.log("-----", user);

    const nameParts = user?.displayName?.split(" ") || ["", ""]; // Split the name into first and last
    const firstName = nameParts[0];
    const lastName = nameParts[1];
    const newUser = await db.collection("users").insertOne({
      userId: user?.uid,
      firstName,
      lastName,
      email: user?.email,
      isActive: true,
      isDeleted: false,
    });

    return newUser;
  } catch (error) {
    console.error("Error creating user in MongoDB", error);
    return null;
  }
}

export async function checkIfUserExists(uid: string): Promise<boolean> {
  try {
    const user = await db.collection("users").findOne({ userId: uid });
    return user ? true : false; // Return true if the user exists, otherwise false
  } catch (error) {
    console.error("Error checking user existence", error);
    return false;
  }
}
