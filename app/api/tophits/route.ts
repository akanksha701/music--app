import { NextResponse } from "next/server";
import dbConnect from "@/lib/DbConnection/dbConnection";
import Music from "@/lib/models/Music";

export async function GET() {
  try {
    await dbConnect();
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
        $addFields: {
          fullArtistName: {
            $concat: [
              { $ifNull: ["$artists.firstName", ""] },
              " ",
              { $ifNull: ["$artists.lastName", ""] },
            ],
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$musicDetails.name" },
          description: { $first: "$musicDetails.description" },
          artists: {
            $push: "$fullArtistName",
          },
          email: { $first: "$artists.email" },
          price: { $first: "$price.amount" },
          currency: { $first: "$price.currency" },
          imageUrl: { $first: "$audioDetails.imgUrl" },
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
        },
      },
    ]);
    console.log("musics", musics);
    return NextResponse.json({ status: 200, data: musics });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ status: 500, message: "Error occurred" });
  }
}
