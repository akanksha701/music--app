import { NextResponse } from "next/server";
import dbConnect from "@/lib/DbConnection/dbConnection";
import Music from "@/lib/models/Music";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const user: any = await currentUser();

    const musics = await Music.aggregate([
      {
        $lookup: {
          from: "artists",
          localField: "musicDetails.artistId",
          foreignField: "userId",
          as: "artistDetails",
        },
      },
      {
        $unwind: {
          path: "$artistDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "artistDetails.userId",
          foreignField: "_id",
          as: "artists",
        },
      },
      {
        $unwind: {
          path: "$artists",
          preserveNullAndEmptyArrays: true,
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
              $project: { likedMusics: 1 },
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
        $addFields: {
          fullArtistName: {
            $concat: [
              { $ifNull: ["$artists.firstName", ""] },
              " ",
              { $ifNull: ["$artists.lastName", ""] },
            ],
          },
          liked: { $in: ["$_id", "$loggedInUser.likedMusics"] },
        },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$musicDetails.name" },
          description: { $first: "$musicDetails.description" },
          artists: { $push: "$fullArtistName" },
          liked: { $first: "$liked" },
          email: { $first: "$artists.email" },
          price: { $first: "$price.amount" },
          currency: { $first: "$price.currency" },
          imageUrl: { $first: "$audioDetails.imageUrl" },
          audioUrl: { $first: "$audioDetails.audioUrl" },
          playTime: { $first: "$playTime" },
        },
      },
      {
        $addFields: {
          artists: {
            $reduce: {
              input: "$artists",
              initialValue: "",
              in: {
                $cond: {
                  if: { $eq: ["$$value", ""] },
                  then: "$$this",
                  else: { $concat: ["$$value", ", ", "$$this"] },
                },
              },
            },
          },
        },
      },
      {
        $sort: {
          playTime: -1,
          _id: 1,
        },
      },
    ]);

    return NextResponse.json({ status: 200, data: musics });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ status: 500, message: "Error occurred" });
  }
}
