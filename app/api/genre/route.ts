import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/DbConnection/dbConnection";
import Genre from "@/lib/models/Genre";
import { NextApiRequest } from "next";
import { capitalizeTitle, saveFiles } from "@/utils/helpers";
import { GENRE_IMAGE_UPLOAD_DIR } from "../music/route";
import path from "path";
import fs from 'fs/promises';
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const { name, description } = body;

    const image = body.image || null; 

    const imageUrl = image && image !== "undefined"
      ? await saveFiles(image as Blob, GENRE_IMAGE_UPLOAD_DIR)
      : "/genres/images/default.jpg"; // Replace with your default image URL.

    const newGenre = await Genre.create({
      name: await capitalizeTitle(name.toString()),
      description: description,
      imageUrl: imageUrl,
    });

    if (newGenre) {
      return NextResponse.json({
        status: 200,
        message: "New genre created successfully",
        data: newGenre,
      });
    }

    return NextResponse.json(
      { error: "Error while creating genres" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try { 
    await dbConnect();
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const url = new URL(req?.url as string);
    const id = url?.searchParams?.get("id");
    const img = body?.img || null;
    console.log("PUT BODY " , body)
    const { name, description } = body;

    let imageUrl;

    const existingGenre = await Genre.findById(id);
if (img instanceof Blob) {
  // Only delete the old file if it's no longer referenced by other genres
  if (existingGenre.imageUrl) {
    const oldFilePath = path.join(GENRE_IMAGE_UPLOAD_DIR, path.basename(existingGenre.imageUrl));
    const isFileReferenced = await Genre.exists({ imageUrl: existingGenre.imageUrl, _id: { $ne: id } });

    if (!isFileReferenced) {
      try {
        await fs.unlink(oldFilePath); // Delete the old file
        console.log(`Deleted old file: ${oldFilePath}`);
      } catch (err) {
        console.error(`Error deleting file: ${oldFilePath}`, err);
      }
    } else {
      console.log(`File is still referenced by other records: ${existingGenre.imageUrl}`);
    }
  }

  // Save the new file and update the URL
  imageUrl = await saveFiles(img, GENRE_IMAGE_UPLOAD_DIR);
} else {
  // If no new file is uploaded, retain the existing imageUrl
  imageUrl = existingGenre.imageUrl;
}

    if (img instanceof Blob) {
      // If 'img' is a Blob (new file), save it and get the new URL
      imageUrl = await saveFiles(img, GENRE_IMAGE_UPLOAD_DIR);
    } else {
      // If 'img' is a path/URL, use it directly
      imageUrl = img;
    }
    const updatedGenre = await Genre.findByIdAndUpdate(
      id,
      { name, description ,imageUrl
         
       },
      { new: true }
    );

    if (updatedGenre) {
      return NextResponse.json({
        status: 200,
        data: updatedGenre,
      });
    }

    return NextResponse.json({ error: 'genre not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const url = new URL(req?.url as string);
    const page: any = parseInt(url?.searchParams?.get('page') || '1', 10); // Default page is 1
    const recordsPerPage: any = parseInt(
      url?.searchParams?.get('recordsPerPage') || '10',
      10
    ); // Default records per page is 10

    // Pagination logic
    const skip = (page - 1) * recordsPerPage;
    const limit = recordsPerPage;

    // If pagination parameters are found, apply skip and limit
    const genreList = await Genre.find({isDeleted: false}).skip(skip).limit(limit);
 
    // Get total count of genres for pagination info
    const totalGenres = await Genre.countDocuments();

    if (genreList) {
      return NextResponse.json({
        status: 200,
        data: genreList,
        pagination: {
          page,
          recordsPerPage,
          totalGenres,
          totalPages: Math.ceil(totalGenres / recordsPerPage), // Calculate total pages
        },
      });
    }

    return NextResponse.json(
      { error: 'Error while fetching genres' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
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

    const updatedGenre = await Genre.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true } // This option ensures the updated document is returned
    );

    if (updatedGenre) {
      return NextResponse.json({
        status: 200,
        message: "genre marked as deleted successfully",
      });
    }

    return NextResponse.json({ error: 'genre not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

