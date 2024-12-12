import dbConnect from "@/lib/DbConnection/dbConnection";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { MediaType } from "@/app/(BrowsePage)/Browse/types/types";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const userDetails: any = await currentUser();
    const body = await req.json();
    const user = await User.findOne({ clerkUserId: userDetails?.id });
    const { id, name } = body;
    if (!user) {
      return NextResponse.json({ message: "User not found." });
    }

    if (MediaType.MUSIC === name) {
      const alreadyLiked = user.likedMusics.includes(
        new mongoose.Types.ObjectId(id)
      );

      if (alreadyLiked) {
        const likedMusics = await User.findOneAndUpdate(
          { clerkUserId: userDetails?.id },
          {
            $pull: { likedMusics: new mongoose.Types.ObjectId(id) },
          },
          { new: true }
        );
        return NextResponse.json({ status: 200, data: likedMusics });
      } else {
        const likedMusics = await User.findOneAndUpdate(
          { clerkUserId: userDetails?.id },
          {
            $addToSet: { likedMusics: id },
          },
          { new: true }
        );
        return NextResponse.json({ status: 200, data: likedMusics });
      }
    }
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
