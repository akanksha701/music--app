import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/DbConnection/dbConnection";
import Language from "@/lib/models/Language";
import { capitalizeTitle, saveFiles } from "@/utils/helpers";
import {    LANGUAGE_IMAGE_UPLOAD_DIR } from "../music/route";
import path from "path";
import fs from 'fs/promises';
import { NextApiRequest } from "next";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    console.log("POST LANG");
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const { name, description } = body;

    const image = body.image || null;

    const imageUrl = image && image !== "undefined" 
      ? await saveFiles(image as Blob, LANGUAGE_IMAGE_UPLOAD_DIR)
      : "/languages/images/default.jpg"; // Replace with your default image URL.

    const newLanguage = await Language.create({
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
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const img = body?.img || null;
    const { name, description } = body;
    let imageUrl;
      const existingLanguage = await Language.findById(id);
    if (img instanceof Blob) {
      // Only delete the old file if it's no longer referenced by other Languages
      if (existingLanguage.imageUrl) {
        const oldFilePath = path.join(LANGUAGE_IMAGE_UPLOAD_DIR, path.basename(existingLanguage.imageUrl));
        const isFileReferenced = await Language.exists({ imageUrl: existingLanguage.imageUrl, _id: { $ne: id } });
    
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
      imageUrl = existingLanguage.imageUrl;
    }
    
        if (img instanceof Blob) {
          // If 'img' is a Blob (new file), save it and get the new URL
          imageUrl = await saveFiles(img, LANGUAGE_IMAGE_UPLOAD_DIR);
        } else {
          // If 'img' is a path/URL, use it directly
          imageUrl = img;
        }

    const updatedLanguage = await Language.findByIdAndUpdate(
      id,
      { name, description , imageUrl : (imageUrl == "undefined" ? "/languages/images/default.jpg" : imageUrl) },
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



export async function GET(req: Request) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    
    const page: any = parseInt(url.searchParams.get("page") || "1", 10); // Default to page 1
    const recordsPerPage: any = parseInt(url.searchParams.get("recordsPerPage") || "0", 10); // Default to 0 (no pagination)
    if (!recordsPerPage || !page) {
      const languageList = await Language.find({isDeleted: false});
      return NextResponse.json({
        status: 200,
        data: languageList,
      });
    }

    // Pagination logic if recordsPerPage is provided
    const skip = (page - 1) * recordsPerPage;
    const limit = recordsPerPage;

    // Fetch paginated data
    const languageList = await Language.find({}).skip(skip).limit(limit);

    // Get total count for pagination
    const totalLanguages = await Language.countDocuments();
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

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const updatedLanguage = await Language.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true } // This option ensures the updated document is returned
    );

    if (updatedLanguage) {
      return NextResponse.json({
        status: 200,
        message: "language marked as deleted successfully",
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

