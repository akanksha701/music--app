import Album from "@/lib/models/Album";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/DbConnection/dbConnection";
import { capitalizeTitle, saveFiles } from "@/utils/helpers";
import { ALBUM_IMAGE_UPLOAD_DIR, IMAGE_UPLOAD_DIR } from "../music/route";
import mongoose from "mongoose";
import { currentUser } from "@clerk/nextjs/server";
import { Label } from "@radix-ui/react-label";
import Genre from "@/lib/models/Genre";
import Language from "@/lib/models/Language";
import Music from "@/lib/models/Music";
import path from "path";
import fs from 'fs/promises';

export async function POST(req: NextRequest) {
  try {
    await dbConnect(); 
    const formData = await req.formData();
    const body = Object.fromEntries(formData); 
    let image: Blob | undefined;

    if ( body.image !== "undefined" && formData.get("image")) {
      image = formData.get("image") as Blob;
    }else{
      image = undefined
    }
    const { name, description, genreIds, languageIds, songIds, price } = body;

    // Fetch genre and language IDs by their names
    const genreNames = JSON.parse(genreIds as string);
    const languageNames = JSON.parse(languageIds as string);

    // Query genre and language collections by name to get the IDs
    const genres = await Genre.find({ name: { $in: genreNames } }).select('_id');
    const languages = await Language.find({ name: { $in: languageNames } }).select('_id');

    // Map the names to their corresponding ObjectIds
    const Genres = genres.map((genre: any) => genre._id);
    const Languages = languages.map((language: any) => language._id);
 
    const Songs = JSON.parse(songIds as string).map((id: string) => new mongoose.Types.ObjectId(id))
    let DefaultUrl  
    if(image === undefined){
      const SongInformation  = await Music.findById(Songs[0]).populate('audioDetails')
 
      DefaultUrl = SongInformation?.audioDetails?.imageUrl
    }
 
    const newAlbum = await Album.create({
      name: await capitalizeTitle(name.toString()),
      description: description,
      Price: Number(price),
      imageUrl: (image != undefined) ? await saveFiles(image, ALBUM_IMAGE_UPLOAD_DIR) : DefaultUrl,
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
      { error: msg },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect();

    const url = new URL(req.url);
    const albumId = url.searchParams.get("AlbumId");
    const artistId = url.searchParams.get("ArtistId");

    // Filter to fetch only non-deleted documents
    let filter: any = { isDeleted: false };

    // If AlbumId is provided, fetch the album with that ID
    if (albumId) {
      const album = await Album.findOne({ _id: albumId, ...filter })
        .populate("Genre")
        .populate("Language")
        .populate("musicIds");

      if (!album) {
        return NextResponse.json(
          { error: "Album not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        status: 200,
        data: album,
      });
    }

    const page: number = parseInt(url.searchParams.get("page") || "1", 10);
    const recordsPerPage: number = parseInt(
      url.searchParams.get("recordsPerPage") || "0",
      10
    );

    // Add ArtistId to the filter if it's present
    if (artistId) {
      filter.Label = artistId;
    }

    // If no pagination params provided, fetch all albums matching the filter
    if (!recordsPerPage || recordsPerPage === 0) {
      const albumList = await Album.find(filter)
        .populate("Genre")
        .populate("Language")
        .populate("musicIds");

      return NextResponse.json({
        status: 200,
        data: albumList,
      });
    }

    // Pagination logic if recordsPerPage and page are provided
    const skip = (page - 1) * recordsPerPage;
    const limit = recordsPerPage;

    const albumList = await Album.find(filter).skip(skip).limit(limit);

    const totalAlbums = await Album.countDocuments(filter); // Count based on the filter

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
    await dbConnect();
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

    const genres = await Genre.find({ name: { $in: genreNames } }).select("_id");
    const languages = await Language.find({ name: { $in: languageNames } }).select("_id");

    const Genres = genres.map((genre: any) => genre._id);
    const Languages = languages.map((language: any) => language._id);

    const Songs = JSON.parse(songIds as string).map((id: string) => new mongoose.Types.ObjectId(id));

    const existingAlbum = await Album.findById(albumId);

    if (!existingAlbum) {
      return NextResponse.json({ error: "Album not found" }, { status: 404 });
    }

    let updatedImageUrl;

    if (image instanceof Blob) {
      // Handle old file deletion logic
      if (existingAlbum.imageUrl) {
        const oldFilePath = path.join(ALBUM_IMAGE_UPLOAD_DIR, path.basename(existingAlbum.imageUrl));
        const isFileReferenced = await Album.exists({
          imageUrl: existingAlbum.imageUrl,
          _id: { $ne: albumId },
        });

        if (!isFileReferenced) {
          try {
            await fs.unlink(oldFilePath); // Delete the old file
            console.log(`Deleted old file: ${oldFilePath}`);
          } catch (err) {
            console.error(`Error deleting file: ${oldFilePath}`, err);
          }
        } else {
          console.log(`File is still referenced by other records: ${existingAlbum.imageUrl}`);
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

    const updatedAlbum = await Album.findByIdAndUpdate(albumId, updatedAlbumData, {
      new: true,
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
//     await dbConnect();

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
    await dbConnect();

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
    const existingAlbum = await Album.findById(albumId);

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

