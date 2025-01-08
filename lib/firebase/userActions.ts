"use server";
import { db } from "@/app/api/user/route";

export async function createUser(user: any) {
  try {
    const newUser = await db.collection("users").insertOne({
      userId: user?.uid,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      imageUrl: user?.imageUrl,
      isActive: true,
      isDeleted: false,
    });

    if (newUser.acknowledged) {
      return {
        ...user,  // Spread the user data
        _id: newUser.insertedId,  // Add the insertedId from MongoDB
      };
    }
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
      const user = {
        userId: existedUser?.userId,
        firstName: existedUser?.firstName,
        lastName: existedUser?.lastName,
        email: existedUser?.email,
        imageUrl: existedUser?.imageUrl,
        isActive: existedUser?.isActive,
        isDeleted: existedUser?.isDeleted,
        gender: existedUser?.gender,
      };
      return user;
    }
  } catch (error) {
    console.error("Error checking user existence", error);
    return false;
  }
}
