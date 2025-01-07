import { NextRequest, NextResponse } from 'next/server';
import { capitalizeTitle, saveFiles } from '@/utils/helpers';
import { ALBUM_IMAGE_UPLOAD_DIR, IMAGE_UPLOAD_DIR } from '../music/route';
import { db } from '../user/route';
import { currentUser } from '@clerk/nextjs/server';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs/promises'; 

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const image = (body.image as Blob) || null;
    const { name, description, price, Songs, Genres, Languages } = body;
    const newAlbum = await db.collection('albums').insertOne({
      name: await capitalizeTitle(name.toString()),
      description: description,
      Price: Number(price),
      imageUrl: (image != undefined) ? await saveFiles(image, ALBUM_IMAGE_UPLOAD_DIR) : "",
      Genre: Genres,
      Language: Languages,
      musicIds: Songs,
      Label: new mongoose.Types.ObjectId("675ab45ad8496e8fd5fb50db"),
    });

    console.log("RESPONSE : " , {
      status: 200,
      message: "new album created successfully",
      data: newAlbum,
    })

    if (newAlbum) {
      return NextResponse.json({
        status: 200,
        message: "new album created successfully",
        data: newAlbum,
      });
    }
    return NextResponse.json(
      { error: "error while creating genres" },
      { status: 400 }
    );
  } catch (error : any) {
    console.log("error : " , error , error)
    let msg = "Internal Server Error"

    switch (error.code) {
      case 11000:
        msg = "Album already exists"
        break;
    
      default:
        break;
    }
 
     
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const page: number = parseInt(url.searchParams.get('page') || '1', 10);
    const recordsPerPage: number = parseInt(
      url.searchParams.get("recordsPerPage") || "0",
      10
    );
    if (!recordsPerPage || recordsPerPage) {
      const albumList = await db.collection('albums').find({});
      return NextResponse.json({
        status: 200,
        data: albumList,
      });
    }
    // Pagination logic if recordsPerPage and page are provided
    const skip = (page - 1) * recordsPerPage;
    const limit = recordsPerPage;

    const albumList = await db
      .collection('albums')
      .find({})
      .skip(skip)
      .limit(limit)
      .toArray();

    const totalAlbums = await db.collection('albums').countDocuments();

    return NextResponse.json({
      status: 200,
      data: albumList,
      pagination: {
        page,
        recordsPerPage,
        totalAlbums,
        totalPages: Math.ceil(totalAlbums / recordsPerPage), // Calculate total pages
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}




export async function PUT(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const CurrentUserInfo: any = await currentUser();
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const CurrentUserId = String(CurrentUserInfo?.id);
    const albumId = url.searchParams.get("id");

    let image: Blob | undefined;

    if (body.image !== "undefined" && formData.get("image")) {
      image = formData.get("image") as Blob;
    } else {
      image = undefined;
    }

    const { name, description, genreIds, languageIds, songIds, price } = body;

    const genreNames = JSON.parse(genreIds as string);
    const languageNames = JSON.parse(languageIds as string);

    const genres = await db.collection("genres")
  .find({ name: { $in: genreNames } })
  .project({ _id: 1 }) // Include only the `_id` field
  .toArray(); // Convert the cursor to an array

    const languages = await db.collection("languages").find({ name: { $in: languageNames } })
    .project({ _id: 1 }) // Include only the `_id` field
    .toArray();

    const Genres = genres.map((genre: any) => genre._id);
    const Languages = languages.map((language: any) => language._id);

    const Songs = JSON.parse(songIds as string).map((id: string) => new mongoose.Types.ObjectId(id));

    const existingAlbum = await db.collection("albums").findOne( { _id: new mongoose.Types.ObjectId(albumId!) });

    if (!existingAlbum) {
      return NextResponse.json({ error: "Album not found" }, { status: 404 });
    }

    let updatedImageUrl;

    if (image instanceof Blob) {
      // Handle old file deletion logic
      if (existingAlbum.imageUrl) {
        const oldFilePath = path.join(ALBUM_IMAGE_UPLOAD_DIR, path.basename(existingAlbum.imageUrl));
        const isFileReferenced = await db.collection("albums").countDocuments({
  imageUrl: existingAlbum.imageUrl,
  _id: { $ne: new mongoose.Types.ObjectId(albumId!) }, // Exclude the current album
});

if (isFileReferenced === 0) {  // If no other album references the image
  try {
    await fs.unlink(oldFilePath);  // Delete the old file
    console.log(`Deleted old file: ${oldFilePath}`);
  } catch (err) {
    console.error(`Error deleting file: ${oldFilePath}`, err);
  }
} else {
  console.log(`File is still referenced by other albums. Not deleting.`);
} 
      }

      // Save the new file and update the URL
      updatedImageUrl = await saveFiles(image, ALBUM_IMAGE_UPLOAD_DIR);
    } else {
      // Retain the existing image URL if no new file is uploaded
      updatedImageUrl = existingAlbum.imageUrl;
    }

    const updatedAlbumData = {
      name: await capitalizeTitle(name.toString()),
      description,
      Price: Number(price),
      imageUrl: updatedImageUrl,
      Genre: Genres,
      Language: Languages,
      musicIds: Songs,
    };

    const updatedAlbum = await db.collection("albums").findOneAndUpdate({
      _id: new mongoose.Types.ObjectId(albumId!),
    }, updatedAlbumData, {
      returnDocument: "after",
    });

    if (updatedAlbum) {
      return NextResponse.json({
        status: 200,
        message: "Album updated successfully",
        data: updatedAlbum,
      });
    }

    return NextResponse.json({ error: "Error while updating album" }, { status: 400 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// export async function DELETE(req: NextRequest) {
//   try {


//     const url = new URL(req.url);
//     const albumId = url.searchParams.get("id");

//     if (!albumId) {
//       return NextResponse.json(
//         { error: "Album ID is required" },
//         { status: 400 }
//       );
//     }

//     const CurrentUserInfo = await currentUser();
//     const CurrentUserId = String(CurrentUserInfo?.id);

//     // Check if the album exists
//     const existingAlbum = await Album.findById(albumId);

//     if (!existingAlbum) {
//       return NextResponse.json(
//         { error: "Album not found" },
//         { status: 404 }
//       );
//     }

//     // Handle old file deletion logic
//     if (existingAlbum.imageUrl) {
//       const oldFilePath = path.join(ALBUM_IMAGE_UPLOAD_DIR, path.basename(existingAlbum.imageUrl));
//       const isFileReferenced = await Album.exists({
//         imageUrl: existingAlbum.imageUrl,
//         _id: { $ne: albumId },
//       });

//       if (!isFileReferenced) {
//         try {
//           await fs.unlink(oldFilePath); // Delete the old file
//           console.log(`Deleted old file: ${oldFilePath}`);
//         } catch (err) {
//           console.error(`Error deleting file: ${oldFilePath}`, err);
//         }
//       } else {
//         console.log(`File is still referenced by other records: ${existingAlbum.imageUrl}`);
//       }
//     }

//     // Update the `isDeleted` flag
//     existingAlbum.isDeleted = true;
//     await existingAlbum.save();

//     return NextResponse.json({
//       status: 200,
//       message: "Album marked as deleted successfully",
//       data: existingAlbum,
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

export async function DELETE(req: NextRequest) {
  try {

    const url = new URL(req.url);
    const albumId = url.searchParams.get("id");

    if (!albumId) {
      return NextResponse.json(
        { error: "Album ID is required" },
        { status: 400 }
      );
    }

    const CurrentUserInfo = await currentUser();
    const CurrentUserId = String(CurrentUserInfo?.id);

    // Check if the album exists
    const existingAlbum = await db.collection('albums').findOne({
      _id: new mongoose.Types.ObjectId(albumId),
    });

    if (!existingAlbum) {
      return NextResponse.json(
        { error: "Album not found" },
        { status: 404 }
      );
    }

    const oldFilePath = path.join(ALBUM_IMAGE_UPLOAD_DIR, path.basename(existingAlbum.imageUrl));
    await fs.unlink(oldFilePath); // Delete the old file

     

    // Update the `isDeleted` flag
    existingAlbum.isDeleted = true;
    existingAlbum.imageUrl = null;
    await existingAlbum.save();

    return NextResponse.json({
      status: 200,
      message: "Album marked as deleted successfully",
      data: existingAlbum,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

