import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/DbConnection/dbConnection";
import Language from "@/lib/models/Language";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req?.json();
    const { name, description } = body;
    const newLanguage = await Language.create({
      name: name,
      description: description,
    });
    if (newLanguage) {
      return NextResponse.json({ status: 200, data: newLanguage });
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

    const updatedLanguage = await Language.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    if (updatedLanguage) {
      return NextResponse.json({
        status: 200,
        data: updatedLanguage,
      });
    }

    return NextResponse.json({ error: "language not found" }, { status: 404 });
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
    const languageList = await Language.find({});
    if (languageList) {
      return NextResponse.json({
        status: 200,
        data: languageList,
      });
    }
    return NextResponse.json(
      { error: "error while fetching languages" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    const url = new URL(req?.url);
    const id = url?.searchParams?.get("id");
    const deletedLanguage = await Language.findByIdAndDelete(id);

    if (deletedLanguage) {
      return NextResponse.json({
        status: 200,
        message: "language deleted successfully",
      });
    }

    return NextResponse.json({ error: "language not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
