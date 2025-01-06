import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server"; 
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/app/api/user/route";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // Validate the artistId input
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid or missing artistId" }, { status: 400 });
    }
 

    const user: any = await currentUser();
 
    const aggregatePipeline = [
      {
        $match: {
          "musicDetails.artistId": { $in: [new mongoose.Types.ObjectId(id)] }, // Match the provided artistId
          isDeleted: false, // Exclude deleted music
        },
      },
      {
        $lookup: {
          from: "artists",
          localField: "musicDetails.artistId", // Match artistId in musicDetails
          foreignField: "_id", // Match _id in artists collection
          as: "artistDetails", // Output as artistDetails
        },
      },
      {
        $unwind: {
          path: "$artistDetails",
          preserveNullAndEmptyArrays: true, // Allow music without artist details
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "artistDetails.userId", // Match userId in artistDetails
          foreignField: "_id", // Match _id in users collection
          as: "userDetails", // Output as userDetails
        },
      },
      {
        $unwind: {
          path: "$userDetails",
          preserveNullAndEmptyArrays: true, // Allow artist without user details
        },
      },
      {
        $lookup: {
          from: "languages",
          localField: "musicDetails.languageId",
          foreignField: "_id",
          as: "languageDetails",
        },
      },
      {
        $unwind: {
          path: "$languageDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "genres",
          localField: "musicDetails.genreId",
          foreignField: "_id",
          as: "genreDetails",
        },
      },
      {
        $unwind: {
          path: "$genreDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users",
          pipeline: [
            {
              $match: { clerkUserId: user.id }, // Match the logged-in user's data
            },
            {
              $project: { likedMusics: 1 }, // Project only likedMusics
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
        $group: {
          _id: "$_id",
          name: { $first: "$musicDetails.name" },
          language: { $first: "$languageDetails.name" },
          genre: { $first: "$genreDetails.name" },
          description: { $first: "$musicDetails.description" },
          artists: { $push: { firstName: "$userDetails.firstName", lastName: "$userDetails.lastName", email: "$userDetails.email" } },
          liked: { $first: { $in: ["$_id", "$loggedInUser.likedMusics"] } },
          price: { $first: "$price.amount" },
          currency: { $first: "$price.currency" },
          imageUrl: { $first: "$audioDetails.imageUrl" },
          audioUrl: { $first: "$audioDetails.audioUrl" },
          createdAt: { $first: "$createdAt" },
        },
      },
      {
        $addFields: {
          artists: {
            $map: {
              input: "$artists",
              as: "artist",
              in: {
                fullName: { $concat: ["$$artist.firstName", " ", "$$artist.lastName"] }, // Concatenate firstName and lastName
                email: "$$artist.email", // Add email field
              },
            },
          },
        },
      },
      {
        $sort: { createdAt: -1, _id: 1 }, // Sort by newest first
      },
    ];
    
    
    const musics = await db.collection("musics").aggregate(aggregatePipeline).toArray();

    if (musics.length > 0) {
      return NextResponse.json({
        status: 200,
        data: musics,
      });
    } else {
      return NextResponse.json({
        status: 404,
        message: "No music found for the given artistId",
      });
    }
  } catch (error) {
    console.error("Error fetching music by artistId:", error);
    return NextResponse.json({
      status: 500,
      message: "An error occurred while fetching music.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
