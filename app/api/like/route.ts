import dbConnect from "@/lib/DbConnection/dbConnection";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { TAGS } from "@/app/(BrowsePage)/Browse/types/types";
import mongoose from "mongoose";

async function handleMusicLike(user: any, id: string, clerkUserId: string) {
  const alreadyLiked = user.likedMusics.includes(
    new mongoose.Types.ObjectId(id)
  );

  const updatedUser = await User.findOneAndUpdate(
    { clerkUserId },
    {
      [alreadyLiked ? "$pull" : "$addToSet"]: {
        likedMusics: new mongoose.Types.ObjectId(id),
      },
    },
    { new: true }
  );

  return updatedUser;
}

async function handleAlbumLike(user: any, id: string, clerkUserId: string) {
  const alreadyLiked = user.likedAlbums.includes(
    new mongoose.Types.ObjectId(id)
  );

  const updatedUser = await User.findOneAndUpdate(
    { clerkUserId },
    {
      [alreadyLiked ? "$pull" : "$addToSet"]: {
        likedAlbums: new mongoose.Types.ObjectId(id),
      },
    },
    { new: true }
  );

  return updatedUser;
}

async function handleGenreLike(user: any, id: string, clerkUserId: string) {
  const alreadyLiked = user.likedGenres.includes(
    new mongoose.Types.ObjectId(id)
  );

  const updatedUser = await User.findOneAndUpdate(
    { clerkUserId },
    {
      [alreadyLiked ? "$pull" : "$addToSet"]: {
        likedGenres: new mongoose.Types.ObjectId(id),
      },
    },
    { new: true }
  );

  return updatedUser;
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const userDetails: any = await currentUser();
    const { id, name } = await req.json();

    const user = await User.findOne({ clerkUserId: userDetails?.id });
    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    let updatedUser;
    switch (name) {
      case (TAGS.MUSIC ):
        updatedUser = await handleMusicLike(user, id, userDetails?.id);
        break;
      case TAGS.NEW_RELEASE:
        updatedUser = await handleMusicLike(user, id, userDetails?.id);
        break;

      case TAGS.ALBUMS:
        updatedUser = await handleAlbumLike(user, id, userDetails?.id);
        break;

      case TAGS.GENRE:
        updatedUser = await handleGenreLike(user, id, userDetails?.id);
        break;

      default:
        return NextResponse.json(
          { message: "Invalid media type." },
          { status: 400 }
        );
    }

    return NextResponse.json({
      status: 200,
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
