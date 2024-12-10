import { NextResponse } from "next/server";
import { NextApiResponse } from "next/types";
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
export async function GET() {
  try {
    await dbConnect();
    const musics = await Music.find({}).limit(8);
    return NextResponse.json({ status: 200, data: musics });
  } catch (error) {
    return NextResponse.json({ error: error, status: 500 });
  }
}
