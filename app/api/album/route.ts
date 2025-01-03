import { NextRequest, NextResponse } from "next/server";
import { capitalizeTitle, saveFiles } from "@/utils/helpers";
import { ALBUM_IMAGE_UPLOAD_DIR, IMAGE_UPLOAD_DIR } from "../music/route";
import mongoose from "mongoose";
import { currentUser } from "@clerk/nextjs/server";
import path from "path";
import fs from 'fs/promises';
import { db } from "../user/route";

export async function POST(req: NextRequest) {
  try {
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
    const genres = await db.collection('genres').find({ name: { $in: genreNames } }).project({ _id: 1 }).toArray();
    const languages = await db.collection('languages').find({ name: { $in: languageNames } }).project({ _id: 1 }).toArray();

    // Map the names to their corresponding ObjectIds
    const Genres = genres.map((genre: any) => genre._id);
    const Languages = languages.map((language: any) => language._id);
 
    const Songs = JSON.parse(songIds as string).map((id: string) => new mongoose.Types.ObjectId(id))
    let DefaultUrl  
if (image === undefined) {
  // Find the song
  const SongInformation = await db.collection('music').aggregate([
    { $match: Songs[0] },  // Match the song document
    {
      $lookup: {
        from: 'audioDetails',  
        localField: 'audioDetails', 
        foreignField: '_id', 
        as: 'audioDetails'  
      }
    }
  ]).toArray();

  // Extract the image URL if available
  const DefaultUrl = SongInformation[0]?.audioDetails?.[0]?.imageUrl;
}

 
    const newAlbum = await db.collection('albums').insertOne({
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
        message: 'new album created successfully',
        data: newAlbum,
      });
    }
    return NextResponse.json(
      { error: 'error while creating genres' },
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
    const url = new URL(req.url);
    const albumId = url.searchParams.get("AlbumId");
    const artistId = url.searchParams.get("ArtistId");
    const type = url.searchParams.get("type");

    // Filter to fetch only non-deleted documents
    let filter: any = { isDeleted: false };

    // If AlbumId and type=musics are provided, fetch musics related to the album
    if (albumId && type === "AlbumSongs") {
      // Fetch the album to get musicIds
      const album = await db.collection('albums').aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(albumId),
            isDeleted: false
          }
        },
        {
          $lookup: {
            from: 'musics',  // Replace with the correct collection name for music
            localField: 'musicIds',
            foreignField: '_id',
            as: 'musicDetails'  // This will be the populated result
          }
        },
        {
          $project: {
            musicDetails: 1,  // Include the populated musicDetails
            _id: 1,  // Include any other fields from the album if needed
          }
        }
      ]).toArray();
      
      if (!album || !album.length || !album[0].musicDetails) {
        return NextResponse.json(
          { error: "Album or associated music not found" },
          { status: 404 }
        );
      }
      
      // Access the music details and extract the IDs
      const musicIds = album[0].musicDetails.map((music: any) => music._id);  // Now accessing 'musicDetails'
      
      
    
      
    
      const user: any = await currentUser();
      const musics = await db.collection('musics').aggregate([
        {
          $match: { _id: { $in: musicIds }, isDeleted: false }, // Match music by IDs
        },
        {
          $lookup: {
            from: "artists",
            let: { artistsIds: "$musicDetails.artistId" },
            pipeline: [
              {
                $match: {
                  $expr: { $in: ["$_id", "$$artistsIds"] },
                },
              },
            ],
            as: "artistDetails",
          },
        },
        {
          $lookup: {
            from: "users",
            let: { artistsIds: "$artistDetails.userId" },
            pipeline: [
              {
                $match: {
                  $expr: { $in: ["$_id", "$$artistsIds"] },
                },
              },
            ],
            as: "artists",
          },
        },
        {
          $lookup: {
            from: "users",
            pipeline: [
              {
                $match: { clerkUserId: user.id },
              },
              {
                $project: { likedMusics: 1 },
              },
            ],
            as: "loggedInUser",
          },
        },
        {
          $unwind: {
            path: "$loggedInUser",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            liked: { $in: ["$_id", "$loggedInUser.likedMusics"] },
          },
        },
        {
          $unwind: {
            path: "$artists",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: "$_id",
            name: { $first: "$musicDetails.name" },
            description: { $first: "$musicDetails.description" },
            duration: { $first: "$musicDetails.duration" },
            artists: {
              $push: {
                $concat: ["$artists.firstName", " ", "$artists.lastName"],
              },
            },
            liked: { $first: "$liked" },
            email: { $first: "$artists.email" },
            price: { $first: "$price.amount" },
            currency: { $first: "$price.currency" },
            imageUrl: { $first: "$audioDetails.imageUrl" },
            audioUrl: { $first: "$audioDetails.audioUrl" },
            playCount: { $first: "$playCount" },
          },
        },
        {
          $addFields: {
            artists: {
              $reduce: {
                input: "$artists",
                initialValue: "",
                in: {
                  $cond: {
                    if: { $eq: ["$$value", ""] },
                    then: "$$this",
                    else: { $concat: ["$$value", ", ", "$$this"] },
                  },
                },
              },
            },
          },
        },
        {
          $sort: {
            playCount: -1,
            _id: 1,
          },
        },
      ]);
    
      return NextResponse.json({ status: 200, data: musics });
    }
    

    // If AlbumId is provided, fetch the album with that ID
    if (albumId) {
      const album = await db.collection('albums').aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(albumId),
            ...filter,
          }
        },
        {
          $lookup: {
            from: 'genres', // Collection name for genres
            localField: 'Genre', // Field to match in the albums collection
            foreignField: '_id',
            as: 'GenreDetails', // Populated result
          }
        },
        {
          $lookup: {
            from: 'languages', // Collection name for languages
            localField: 'Language', // Field to match in the albums collection
            foreignField: '_id',
            as: 'LanguageDetails', // Populated result
          }
        },
        {
          $lookup: {
            from: 'musics', // Collection name for music
            localField: 'musicIds', // Field to match in the albums collection
            foreignField: '_id',
            as: 'musicDetails', // Populated result
          }
        },
        {
          $project: {
            GenreDetails: 1,
            LanguageDetails: 1,
            musicDetails: 1,
            _id: 1,
            // Any other fields you want from the album collection
          }
        }
      ]).toArray();
      
      if (!album || album.length === 0 || !album[0].musicDetails) {
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
      const albumList = await db.collection("albums").aggregate([
        { $match: filter }, // Apply your filter condition
        {
          $lookup: {
            from: "genres", // The name of the collection for Genre
            localField: "Genre", // The field in albums that references Genre
            foreignField: "_id", // The field in Genre collection
            as: "GenreDetails", // The name of the output array
          },
        },
        {
          $lookup: {
            from: "languages", // The name of the collection for Language
            localField: "Language", // The field in albums that references Language
            foreignField: "_id", // The field in Language collection
            as: "LanguageDetails", // The name of the output array
          },
        },
        {
          $lookup: {
            from: "musics", // The name of the collection for Music
            localField: "musicIds", // The field in albums that references musicIds
            foreignField: "_id", // The field in Musics collection
            as: "MusicDetails", // The name of the output array
          },
        },
        {
          $addFields: {
            Genre: { $arrayElemAt: ["$GenreDetails", 0] }, // Flatten GenreDetails
            Language: { $arrayElemAt: ["$LanguageDetails", 0] }, // Flatten LanguageDetails
            musicIds: "$MusicDetails", // Replace musicIds with full details
          },
        },
        {
          $project: {
            GenreDetails: 0, // Remove temporary fields
            LanguageDetails: 0,
            MusicDetails: 0,
          },
        },
      ]).toArray();
      
      return NextResponse.json({
        status: 200,
        data: albumList,
      });
    }

    // Pagination logic if recordsPerPage and page are provided
    const skip = (page - 1) * recordsPerPage;
    const limit = recordsPerPage;

    const albumList = await db.collection("albums").find(filter).skip(skip).limit(limit);

    const totalAlbums = await db.collection("albums").countDocuments(filter); // Count based on the filter

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

