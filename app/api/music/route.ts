import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { capitalizeTitle, getAudioDuration, saveFiles } from "@/utils/helpers";
import mongoose from "mongoose";
import { currentUser, User } from "@clerk/nextjs/server";
import { db } from "../user/route";
import { getMusicWithPeaks } from "@/utils/getPeaks";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const LANGUAGE_IMAGE_UPLOAD_DIR = path.resolve("public/languages/images");
export const IMAGE_UPLOAD_DIR = path.resolve("public/music/images");
export const AUDIO_UPLOAD_DIR = path.resolve("public/music/audio");
export const ALBUM_IMAGE_UPLOAD_DIR = path.resolve("public/albums/images");
export const GENRE_IMAGE_UPLOAD_DIR = path.resolve("public/genres/images");

export async function POST(req: Request) {
  try {
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
    const audioUrl = audio ? await saveFiles(audio, AUDIO_UPLOAD_DIR) : null;
    const peaks = await getMusicWithPeaks(audioUrl as string);
    if (body.album) {
      const newMusic = await db.collection("musics").insertOne({
        musicDetails: {
          name: await capitalizeTitle(body?.name.toString()),
          description: body.description,
          genreId: body.genre,
          languageId: body.language,
          artistId: artistIds,
          releaseDate: new Date(),
          duration: (await getAudioDuration(audio)) || 0,
        },
        audioDetails: {
          imageUrl: image ? await saveFiles(image, IMAGE_UPLOAD_DIR) : null,
          audioUrl: audio ? await saveFiles(audio, AUDIO_UPLOAD_DIR) : null,
          peaks: peaks || [],
        },
        playCount: 0,
        price: {
          amount: Number(body.priceAmount || 0),
          currency: body.currency || "USD",
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const albumIds = Array.isArray(body?.album) ? body?.album : [body?.album];

      const objectIds = albumIds.map((id: any) => id.toString());
      const updatedAlbum = await db
        .collection("albums")
        .updateMany(
          { _id: { $in: objectIds } },
          { $addToSet: { musicIds: newMusic.insertedId } }
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

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req?.url as string);
    const queryParams = req.nextUrl.searchParams;
    const UserId = queryParams.get('id'); // Replace with your parameter key 
    const page: any = await url?.searchParams?.get('page');
    const recordsPerPage: any = await url?.searchParams?.get('recordsPerPage');
    const language: string | null =
      (await url?.searchParams?.get("language")) || null;

    let currentPage = 1;
    let limit = 0;

    if (page && recordsPerPage) {
      currentPage = parseInt(page, 10);
      limit = parseInt(recordsPerPage, 10);
    }

    const skip = (currentPage - 1) * limit;

    const totalRecords = await await db.collection("musics").countDocuments();
    const user: User | null = await currentUser();

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
        $lookup: {
          from: "languages",
          localField: "musicDetails.languageId",
          foreignField: "_id",
          as: "languageDetails",
        },
      },
      {
        $unwind: {
          path: "$artistDetails",
          preserveNullAndEmptyArrays: true,
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
              $match: { clerkUserId: user?.id  || UserId },
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
    ];

    if (language) {
      await aggregatePipeline.push({
        $match: {
          "languageDetails.name": await language,
        },
      });
    }

    await aggregatePipeline.push(
      {
        $group: {
          _id: "$_id",
          name: { $first: "$musicDetails.name" },
          language: { $first: "$languageDetails.name" },
          duration: { $first: "$musicDetails.duration" },
          description: { $first: "$musicDetails.description" },
          artists: {
            $push: "$fullArtistName",
          },
          liked: { $first: "$liked" },
          email: { $first: "$artists.email" },
          price: { $first: "$price.amount" },
          currency: { $first: "$price.currency" },
          imageUrl: { $first: "$audioDetails.imageUrl" },
          audioUrl: { $first: "$audioDetails.audioUrl" },
          peaks: { $first: "$audioDetails.peaks" },
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
      { $sort: { createdAt: -1, _id: 1 } }
    );

    if (limit > 0) {
      aggregatePipeline.push({ $skip: skip }, { $limit: limit });
    }

    const musics = await db
      .collection("musics")
      .aggregate(aggregatePipeline)
      .toArray();

    const totalPages = limit > 0 ? Math.ceil(totalRecords / limit) : 1;

    return NextResponse.json({
      status: 200,
      data: {
        data: musics,
        pagination:
          limit > 0
            ? {
                currentPage,
                totalPages,
                totalRecords,
                recordsPerPage: limit,
              }
            : undefined,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ status: 500, message: "Error occurred" });
  }
}
