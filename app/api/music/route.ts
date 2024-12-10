import { NextRequest, NextResponse } from "next/server";
import { NextApiResponse } from "next/types";
import dbConnect from "@/lib/DbConnection/dbConnection";
import Music from "@/lib/models/Music";
import path from "path";
import fs from "fs";
import { saveFiles } from "@/utils/helpers";

export const config = {
  api: {
    bodyParser: false,
  },
};

const IMAGE_UPLOAD_DIR = path.resolve(
  process.env.ROOT_PATH ?? "",
  "public/music/images"
);
const AUDIO_UPLOAD_DIR = path.resolve(
  process.env.ROOT_PATH ?? "",
  "public/music/audio"
);

export async function POST(req: Request) {
  const formData = await req.formData();
  const body = Object.fromEntries(formData);
  const audio = (body.audio as Blob) || null;
  const image = (body.image as Blob) || null;
  const audioFileUrl = await saveFiles(image, AUDIO_UPLOAD_DIR);
  const imageFileUrl = await saveFiles(audio, IMAGE_UPLOAD_DIR);

  const newMusic = await Music.create({
    musicDetails: {
      name: body.name,
      description: body.description,
      genreId: body.genre,
      languageId: body.language,
      artistId: body.artists,
      releaseDate: new Date(),
      duration: Number(body?.duration || 0),
    },
    audioDetails: {
      imgUrl: imageFileUrl,
      audioUrl: audioFileUrl,
    },
    price: {
      amount: Number(body.priceAmount || 0),
      currency: body.currency || "USD",
    },
  });
  return NextResponse.json({
    success: true,
    data: newMusic,
  });
}
export async function GET(req: any, res: NextApiResponse) {
  try {
    await dbConnect();
    const musics = await Music.find({}).limit(8);
    return NextResponse.json({ status: 200, data: musics });
  } catch (error) {
    return NextResponse.json({ error: error, status: 500 });
  }
}
