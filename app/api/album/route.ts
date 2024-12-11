import Album from "@/lib/models/Album";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/DbConnection/dbConnection";
import { capitalizeTitle, saveFiles } from "@/utils/helpers";
import { ALBUM_IMAGE_UPLOAD_DIR, IMAGE_UPLOAD_DIR } from "../music/route";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const image = (body.image as Blob) || null;
    const { name, description } = body;
    const newGenre = await Album.create({
      name: await capitalizeTitle(name.toString()),
      description: description,
      imageUrl: image ? await saveFiles(image, ALBUM_IMAGE_UPLOAD_DIR) : null,
    });
    if (newGenre) {
      return NextResponse.json({
        status: 200,
        message: "New album created successfully",
        data: newGenre,
      });
    }
    return NextResponse.json(
      { error: "error while creating genres" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const AlbumList = await Album.find({});
    if (AlbumList) {
      return NextResponse.json({ status: 200, data: AlbumList });
    }

    return NextResponse.json(
      { error: "error while fetching albums" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
