import { NextResponse } from "next/server";
import { currentUser, User } from "@clerk/nextjs/server";
import { audioDirectory, getMusicWithPeaks } from "@/utils/getPeaks";
import { db } from "../user/route";

export async function GET() {
  try {
    const user: User | null = await currentUser();
    const musics = await db
      .collection("musics")
      .aggregate([
        {
          $lookup: {
            from: "artists",
            let: { artistsIds: "$musicDetails.artistId" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ["$userId", "$$artistsIds"],
                  },
                },
              },
            ],
            as: "artistDetails",
          },
        },
        {
          $lookup: {
            from: "users",
            let: { artistsIds: "$artistDetails.userId" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ["$_id", "$$artistsIds"],
                  },
                },
              },
            ],
            as: "artists",
          },
        },
        {
          $lookup: {
            from: "users",
            pipeline: [
              {
                $match: { clerkUserId: user?.id },
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
            liked: { $in: ["$_id", "$loggedInUser.likedMusics"] },
          },
        },
        {
          $unwind: {
            path: "$artists",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: "$_id",
            name: { $first: "$musicDetails.name" },
            description: { $first: "$musicDetails.description" },
            duration: { $first: "$musicDetails.duration" },
            artists: {
              $push: {
                $concat: ["$artists.firstName", " ", "$artists.lastName"],
              },
            },
            liked: { $first: "$liked" },
            email: { $first: "$artists.email" },
            price: { $first: "$price.amount" },
            currency: { $first: "$price.currency" },
            imageUrl: { $first: "$audioDetails.imageUrl" },
            audioUrl: { $first: "$audioDetails.audioUrl" },
            peaks: { $first: "$audioDetails.peaks" },
            playCount: { $first: "$playCount" },
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
            playCount: -1,
            _id: 1,
          },
        },
      ])
      .toArray();
    return NextResponse.json({ status: 200, data: musics });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ status: 500, message: "Error occurred" });
  }
}
