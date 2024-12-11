import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/DbConnection/dbConnection";
import Genre from "@/lib/models/Genre";
import { NextApiRequest } from "next";
import { capitalizeTitle, saveFiles } from "@/utils/helpers";
import {  GENRE_IMAGE_UPLOAD_DIR } from "../music/route";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const image = (body.image as Blob) || null;
    const { name, description } = body;
    const newGenre = await Genre.create({
      name: await capitalizeTitle(name.toString()),
      description: description,
      imageUrl: image ? await saveFiles(image, GENRE_IMAGE_UPLOAD_DIR) : null,
    });
    if (newGenre) {
      return NextResponse.json({ status: 200,message:'new genre created successfully', data: newGenre });
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
export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const url = new URL(req?.url as string);
    const id = url?.searchParams?.get("id");
    const body = await req?.json();
    const { name, description } = body;

    const updatedGenre = await Genre.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    if (updatedGenre) {
      return NextResponse.json({
        status: 200,
        data: updatedGenre,
      });
    }

    return NextResponse.json({ error: "genre not found" }, { status: 404 });
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
    const genreList = await Genre.find({});
    if (genreList) {
      return NextResponse.json({ status: 200, data: genreList });
    }
    return NextResponse.json(
      { error: "error while fetching genres" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextApiRequest) {
  try {
    await dbConnect();
    const url = new URL(req?.url as string);
    const id = url?.searchParams?.get("id");
    const deletedGenre = await Genre.findByIdAndDelete(id);

    if (deletedGenre) {
      return NextResponse.json({
        status: 200,
        message: "genre deleted successfully",
      });
    }

    return NextResponse.json({ error: "genre not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
