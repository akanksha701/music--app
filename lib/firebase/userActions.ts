"use server";
import { db } from "@/app/api/user/route";

export async function createUser(user: any) {
  try {
    const newUser = await db.collection("users").insertOne({
      userId: user?.uid,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      imageUrl:user?.imageUrl,
      isActive: true,
      isDeleted: false,
    });

    return newUser;
  } catch (error) {
    console.error("Error creating user in MongoDB", error);
    return null;
  }
}

export async function checkIfUserExists(user: any) {
  try {
    const existedUser = await db
      .collection("users")
      .findOne({ userId: user?.uid as string });
    if (!existedUser) {
      const newUser = await createUser(user);
      return newUser;
    } else {
      return user;
    }
  } catch (error) {
    console.error("Error checking user existence", error);
    return false;
  }
}
