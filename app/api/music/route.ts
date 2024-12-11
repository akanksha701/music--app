import { NextResponse } from "next/server";
import dbConnect from "@/lib/DbConnection/dbConnection";
import Music from "@/lib/models/Music";
import path from "path";
import { getAudioDuration, saveFiles } from "@/utils/helpers";
import mongoose from "mongoose";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const IMAGE_UPLOAD_DIR = path.resolve("public/music/images");
export const AUDIO_UPLOAD_DIR = path.resolve("public/music/audio");

export async function POST(req: Request) {
  await dbConnect();
  const formData = await req.formData();
  const body = Object.fromEntries(formData);
  const audio = (body.audio as Blob) || null;
  const image = (body.image as Blob) || null;

  const artistIds = body.artists
    ? body.artists
        .toString()
        .split(",")
        .map((id: string) => new mongoose.Types.ObjectId(id))
    : [];
  const newMusic = await Music.create({
    musicDetails: {
      name: body.name,
      description: body.description,
      genreId: body.genre,
      languageId: body.language,
      artistId: artistIds,
      releaseDate: new Date(),
      duration: Number((await getAudioDuration(audio)) || 0),
    },
    audioDetails: {
      imgUrl: image ? await saveFiles(image, IMAGE_UPLOAD_DIR) : null,
      audioUrl: audio ? await saveFiles(audio, AUDIO_UPLOAD_DIR) : null,
    },
    price: {
      amount: Number(body.priceAmount || 0),
      currency: body.currency || "USD",
    },
  });
  return NextResponse.json({
    status: 200,
    message: "new music created successfully",
    data: newMusic,
  });
}

export async function GET(req: any) {
  try {
    const url = new URL(req?.url as string);
    const page: any = url?.searchParams?.get("page");
    const recordsPerPage: any = url?.searchParams?.get("recordsPerPage");

    const currentPage = parseInt(page, 10);
    const limit = parseInt(recordsPerPage, 10);

    const skip = (currentPage - 1) * limit;

    await dbConnect();

    const totalRecords = await Music.countDocuments();

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
          createdAt: { $first: "$createdAt" },
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
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
    ]);

    const totalPages = Math.ceil(totalRecords / limit);

    return NextResponse.json({
      status: 200,
      data: {
        data: musics,
        pagination: {
          currentPage,
          totalPages,
          totalRecords,
          recordsPerPage: limit,
        },
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ status: 500, message: "Error occurred" });
  }
}
