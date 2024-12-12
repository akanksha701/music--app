import { NextResponse } from "next/server";
import dbConnect from "@/lib/DbConnection/dbConnection";
import Album from "@/lib/models/Album";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  try {
    await dbConnect();
    const user: any = await currentUser();
    const albums = await Album.aggregate([
      {
        $lookup: {
          from: "musics",
          localField: "musicIds",
          foreignField: "_id",
          as: "musicDetails",
        },
      },
      {
        $match: {
          $or: [{ musicIds: { $ne: [] } }],
        },
      },
      {
        $lookup: {
          from: "users",
          pipeline: [
            {
              $match: { clerkUserId: user.id },
            },
            {
              $project: { likedAlbums: 1 },
            },
          ],
          as: "loggedInUser",
        },
      },
      {
        $unwind: {
          path: "$loggedInUser",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$musicDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          liked: { $in: ["$_id", "$loggedInUser.likedAlbums"] },
        },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          liked: { $first: "$liked" },
          imageUrl: { $first: "$imageUrl" },
          description: { $first: "$description" },
          count: { $sum: "$musicDetails.playTime" },
        },
      },
      {
        $sort: { count: -1, _id: 1 },
      },
    ]);

    return NextResponse.json({ status: 200, data: albums });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ status: 500, message: "Error occurred" });
  }
}
