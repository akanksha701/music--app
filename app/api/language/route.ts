import { NextRequest, NextResponse } from "next/server";
import { capitalizeTitle, saveFiles } from "@/utils/helpers";
import { LANGUAGE_IMAGE_UPLOAD_DIR } from "../music/route";
import path from "path";
import fs from 'fs/promises';
import { NextApiRequest } from "next";
import { db } from "../user/route";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const { name, description } = body;

    const image = body.image || null;

    const imageUrl = image && image !== "undefined"
      ? await saveFiles(image as Blob, LANGUAGE_IMAGE_UPLOAD_DIR)
      : "/languages/images/default.jpg"; // Replace with your default image URL.

    const newLanguage = await db.collection("languages").insertOne({
      name: await capitalizeTitle(name.toString()),
      description: description,
      imageUrl: imageUrl,
    });

    if (newLanguage) {
      return NextResponse.json({
        status: 200,
        message: "New language created successfully",
        data: newLanguage,
      });
    }

    return NextResponse.json(
      { error: "Error while creating language" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}


export async function PUT(req: NextRequest) {
  try {
    const url = new URL(req?.url as string);
    const id = url?.searchParams?.get("id");
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const img = body?.img || null;
    const { name, description } = body;
    let imageUrl;
    const existingLanguage = await db.collection("languages").findOne({ _id: new mongoose.Types.ObjectId(id!) });
    if (img instanceof Blob) {
      // Only delete the old file if it's no longer referenced by other Languages
      if (existingLanguage?.imageUrl) {
        const oldFilePath = path.join(LANGUAGE_IMAGE_UPLOAD_DIR, path.basename(existingLanguage.imageUrl));
        const isFileReferenced = await db.collection("languages").findOne({
          imageUrl: existingLanguage.imageUrl,
          _id: { $ne: id ? new mongoose.Types.ObjectId(id) : undefined }, // Ensure _id is an ObjectId
        });
        
        const fileReferenced = !!isFileReferenced;
        if (!isFileReferenced) {
          try {
            await fs.unlink(oldFilePath); // Delete the old file
            console.log(`Deleted old file: ${oldFilePath}`);
          } catch (err) {
            console.error(`Error deleting file: ${oldFilePath}`, err);
          }
        } else {
          console.log(`File is still referenced by other records: ${existingLanguage.imageUrl}`);
        }
      }

      // Save the new file and update the URL
      imageUrl = await saveFiles(img, LANGUAGE_IMAGE_UPLOAD_DIR);
    } else {
      // If no new file is uploaded, retain the existing imageUrl
      imageUrl = existingLanguage?.imageUrl;
    }

    if (img instanceof Blob) {
      // If 'img' is a Blob (new file), save it and get the new URL
      imageUrl = await saveFiles(img, LANGUAGE_IMAGE_UPLOAD_DIR);
    } else {
      // If 'img' is a path/URL, use it directly
      imageUrl = img;
    }
    if (id === null) {
      throw new Error('ID cannot be null');
    }
    const updatedLanguage = await db.collection("languages").findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { name, description, imageUrl: (imageUrl == "undefined" ? "/languages/images/default.jpg" : imageUrl) },
      { returnDocument: 'after' }
    );

    if (updatedLanguage) {
      return NextResponse.json({
        status: 200,
        data: updatedLanguage,
      });
    }

    return NextResponse.json({ error: 'language not found' }, { status: 404 });
  } catch (error) {
    console.log("ERR :  " , error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}



export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const page = parseInt(url.searchParams.get('page') || '1', 10); // Default to page 1
    const recordsPerPage = parseInt(
      url.searchParams.get('recordsPerPage') || '0',
      10
    ); // Default to 0 (no pagination)
    if (!recordsPerPage || !page) {
      const languageList = await db.collection('languages').find({}).toArray();
      return NextResponse.json({
        status: 200,
        data: languageList,
      });
    }

    // Pagination logic if recordsPerPage is provided
    const skip = (page - 1) * recordsPerPage;
    const limit = recordsPerPage;

    // Fetch paginated data
    const languageList = await db
      .collection('languages')
      .find({})
      .skip(skip)
      .limit(limit).toArray();

    // Get total count for pagination
    const totalLanguages = await db.collection('languages').countDocuments();
    return NextResponse.json({
      status: 200,
      data: languageList,
      pagination: {
        page,
        recordsPerPage,
        totalLanguages,
        totalPages: Math.ceil(totalLanguages / recordsPerPage), // Calculate total pages
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}



export async function DELETE(req: NextApiRequest) {
  try {
    const url = new URL(req?.url as string);
    const id = url?.searchParams?.get('id');
    if (id === null) {
      throw new Error('ID cannot be null');
    }
    const deletedLanguage = await db
      .collection('languages')
      .findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) });

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const updatedLanguage = await db.collection("languages").findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { isDeleted: true },
      { returnDocument: 'after' } // This option ensures the updated document is returned
    );

    if (updatedLanguage) {
      return NextResponse.json({
        status: 200,
        message: "language marked as deleted successfully",
      });
    }

    return NextResponse.json({ error: 'language not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

