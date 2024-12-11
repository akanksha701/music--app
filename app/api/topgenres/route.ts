import { NextResponse } from "next/server";
import dbConnect from "@/lib/DbConnection/dbConnection";
import Music from "@/lib/models/Music";

export async function GET() {
  try {
    await dbConnect();
    const albums = await Music.aggregate([
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
        $project: {
          _id: 1,
          name: "$musicDetails.name",
          playTime: 1,
          genre: "$genreDetails.name",
          genreId: "$genreDetails._id",
          imageUrl: "$genreDetails.imageUrl" ,
        },
      },
      {
        $group: {
          _id: "$genreId",
          name: { $first: "$genre" },
          imageUrl: { $first: "$imageUrl" },
          musics: {
            $push: {
              id: "$_id",
              playTime: "$playTime",
              name: "$name",
            },
          },
          totalPlayTime: { $sum: "$playTime" },
        },
      },
      {
        $sort: { totalPlayTime: -1 },
      },
      {
        $addFields: {
          musics: {
            $sortArray: {
              input: "$musics",
              sortBy: { playTime: -1 },
            },
          },
        },
      },
      {
        $project: {
          name: 1,
          totalPlayTime: 1,
          musics: 1,
          imageUrl: 1
        },
      },
    ]);

    return NextResponse.json({ status: 200, data: albums });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ status: 500, message: "Error occurred" });
  }
}
