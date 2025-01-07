import { NextResponse } from "next/server";
import { currentUser, User } from "@clerk/nextjs/server";
import { TAGS } from "@/app/(BrowsePage)/Browse/types/types";
import mongoose, { Types } from "mongoose";
import { db } from "../user/route";

async function handleMusicLike(user: any, id: string, clerkUserId: string) {
  const alreadyLiked = user.likedMusics.some((likedMusic: Types.ObjectId) =>
    likedMusic.equals(new mongoose.Types.ObjectId(id))
  );

  const updatedUser = await db.collection("users").findOneAndUpdate(
    { clerkUserId },
    {
      [alreadyLiked ? "$pull" : "$addToSet"]: {
        likedMusics: new mongoose.Types.ObjectId(id),
      },
    },
    { returnDocument: "after" }
  );
  return updatedUser;
}

async function handleAlbumLike(user: any, id: string, clerkUserId: string) {
  const alreadyLiked = user.likedMusics.some((likedAlbums: Types.ObjectId) =>
    likedAlbums.equals(new mongoose.Types.ObjectId(id))
  );
  const updatedUser = await db.collection("users").findOneAndUpdate(
    { clerkUserId },
    {
      [alreadyLiked ? "$pull" : "$addToSet"]: {
        likedAlbums: new mongoose.Types.ObjectId(id),
      },
    },
    { returnDocument: "after" }
  );

  return updatedUser;
}

async function handleGenreLike(user: any, id: string, clerkUserId: string) {
  const alreadyLiked = user.likedGenres.some((likedGenres: Types.ObjectId) =>
    likedGenres.equals(new mongoose.Types.ObjectId(id))
  );
  const updatedUser = await db.collection("users").findOneAndUpdate(
    { clerkUserId },
    {
      [alreadyLiked ? "$pull" : "$addToSet"]: {
        likedGenres: new mongoose.Types.ObjectId(id),
      },
    },
    { returnDocument: "after" }
  );
  return updatedUser;
}

export async function POST(req: Request) {
  try {
    const userDetails: User | null = await currentUser();
    const { id, name } = await req.json();

    const user = await db
      .collection("users")
      .findOne({ clerkUserId: userDetails?.id });
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    let updatedUser;
    switch (name) {
      case TAGS.MUSIC:
        updatedUser = await handleMusicLike(
          user,
          id,
          userDetails?.id as string
        );
        break;
      case TAGS.NEW_RELEASE:
        updatedUser = await handleMusicLike(
          user,
          id,
          userDetails?.id as string
        );
        break;

      case TAGS.ALBUMS:
        updatedUser = await handleAlbumLike(
          user,
          id,
          userDetails?.id as string
        );
        break;

      case TAGS.GENRE:
        updatedUser = await handleGenreLike(
          user,
          id,
          userDetails?.id as string
        );
        break;

      default:
        return NextResponse.json(
          { message: "Invalid media type." },
          { status: 400 }
        );
    }

    return NextResponse.json({
      status: 200,
      data: {},  // Removed data from the response ( Updated user object )
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
