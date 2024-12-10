import Album from "@/lib/models/Album";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/DbConnection/dbConnection";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req?.json();
    const { name, description } = body;
    const newGenre = await Album.create({
      name: name,
      description: description,
    });
    if (newGenre) {
      return NextResponse.json({ status: 200, data: newGenre });
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