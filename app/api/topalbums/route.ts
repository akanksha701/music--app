import { NextResponse } from "next/server";
import dbConnect from "@/lib/DbConnection/dbConnection";
import Album from "@/lib/models/Album";

export async function GET() {
  try {
    await dbConnect();

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
        $unwind: {
          path: "$musicDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          imageUrl: { $first: "$imageUrl" },
          description: { $first: "$description" },
          count: { $sum: "$musicDetails.playTime" },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    return NextResponse.json({ status: 200, data: albums });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ status: 500, message: "Error occurred" });
  }
}
