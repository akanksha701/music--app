import { NextResponse } from "next/server";
import dbConnect from "@/lib/DbConnection/dbConnection";
import Music from "@/lib/models/Music";
import path from "path";
import { capitalizeTitle, getAudioDuration, saveFiles } from "@/utils/helpers";
import mongoose from "mongoose";
import Album from "@/lib/models/Album";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const IMAGE_UPLOAD_DIR = path.resolve("public/music/images");
export const AUDIO_UPLOAD_DIR = path.resolve("public/music/audio");
export const ALBUM_IMAGE_UPLOAD_DIR = path.resolve("public/albums/images");

export async function POST(req: Request) {
  try {
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

    if (body.album) {
      const newMusic = await Music.create({
        musicDetails: {
          name: await capitalizeTitle(body?.name.toString()),
          description: body.description,
          genreId: body.genre,
          languageId: body.language,
          artistId: artistIds,
          releaseDate: new Date(),
          duration: Number((await getAudioDuration(audio)) || 0),
        },
        audioDetails: {
          imageUrl: image ? await saveFiles(image, IMAGE_UPLOAD_DIR) : null,
          audioUrl: audio ? await saveFiles(audio, AUDIO_UPLOAD_DIR) : null,
        },
        price: {
          amount: Number(body.priceAmount || 0),
          currency: body.currency || "USD",
        },
      });
      const updatedAlbum = await Album.updateOne(
        { _id: new mongoose.Types.ObjectId(body.album.toString()) },
        { $addToSet: { musicIds: newMusic._id } }
      );

      if (!updatedAlbum) {
        return NextResponse.json({
          status: 500,
          message: "An error occurred while creating new music.",
        });
      }
      return NextResponse.json({
        status: 200,
        message: "New music created successfully",
        data: newMusic,
      });
    } else {
      return NextResponse.json({
        status: 400,
        message: "Album ID is required",
      });
    }
  } catch (error) {
    console.error("Error creating new music:", error);
    return NextResponse.json({
      status: 500,
      message: "An error occurred while creating new music.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function GET(req: any) {
  try {
    const url = new URL(req?.url as string);
    const page: any = url?.searchParams?.get("page");
    const recordsPerPage: any = url?.searchParams?.get("recordsPerPage");

    let currentPage = 1; // Default to page 1
    let limit = 0; // Default to no limit (fetch all records)

    if (page && recordsPerPage) {
      currentPage = parseInt(page, 10);
      limit = parseInt(recordsPerPage, 10);
    }

    const skip = (currentPage - 1) * limit;

    await dbConnect();

    const totalRecords = await Music.countDocuments();

    const aggregatePipeline: any[] = [
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
          imageUrl: { $first: "$audioDetails.imageUrl" },
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
    ];

    if (limit > 0) {
      aggregatePipeline.push(
        { $skip: skip },
        { $limit: limit }
      );
    }

    const musics = await Music.aggregate(aggregatePipeline);

    const totalPages = limit > 0 ? Math.ceil(totalRecords / limit) : 1;

    return NextResponse.json({
      status: 200,
      data: {
        data: musics,
        pagination: limit > 0 ? {
          currentPage,
          totalPages,
          totalRecords,
          recordsPerPage: limit,
        } : undefined,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ status: 500, message: "Error occurred" });
  }
}
