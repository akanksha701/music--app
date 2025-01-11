import { NextRequest, NextResponse } from 'next/server';
import { capitalizeTitle, saveFiles } from '@/utils/helpers';
import { ALBUM_IMAGE_UPLOAD_DIR } from '../music/route';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs/promises';
import { db } from '../user/route'; 
import { auth } from '@/lib/firebase/firebaseAdmin/auth';
import { getAlbumByFilter, getAlbumByIDPipeline, getAlbumPipeline, musicAggregationPipeline } from './queries';
import { IAlbum, Ifilter, IGenre, ILanguage } from './types/types';
  
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const body = Object.fromEntries(formData); 
    let image: Blob | undefined;
    if ( body.image !== 'undefined' && formData.get('image')) {
      image = formData.get('image') as Blob;
    }else{
      image = undefined;
    }
    const { name, description, genreIds, languageIds, songIds, price } = body;
    const genreNames = JSON.parse(genreIds as string);
    const languageNames = JSON.parse(languageIds as string);
    const genres = await db.collection('genres').find({ name: { $in: genreNames } }).project({ _id: 1 }).toArray();
    const languages = await db.collection('languages')
      .find({ name: { $in: languageNames } })
      .project({ _id: 1 }).toArray();
    const Genres = (genres as IGenre[]).map((genre) => genre._id);
    const Languages = (languages as ILanguage[]).map((language) => language._id);
    const Songs = JSON.parse(songIds as string).map((id: string) => new mongoose.Types.ObjectId(id));
    let DefaultUrl;  
    const newAlbum = await db.collection('albums').insertOne({
      name: await capitalizeTitle(name.toString()),
      description: description,
      Price: Number(price),
      imageUrl: (image !== undefined) ? await saveFiles(image, ALBUM_IMAGE_UPLOAD_DIR) : DefaultUrl,
      Genre: Genres,
      Language: Languages,
      musicIds: Songs,
      Label: new mongoose.Types.ObjectId('677e45c50134cc638e911c95'),
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      Rating: 0,
      ShareCount: 0
    });
    if (newAlbum) {
      return NextResponse.json({ status: 200, message: 'new album created successfully', data: newAlbum});
    }
    return NextResponse.json(
      { error: 'error while creating genres' },
      { status: 400 }
    );
  } catch (error : unknown  ) { 
    let msg = 'Internal Server Error';
    switch ((error as { code: number }).code) {
    case 11000:
      msg = 'Album already exists';
      break;
    default:
      break;
    }    
    return NextResponse.json( { error: msg }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const albumId = url.searchParams.get('AlbumId');
    const artistId = url.searchParams.get('ArtistId');
    const type = url.searchParams.get('type');
    const page: number = parseInt(url.searchParams.get('page') || '1', 10);
    const recordsPerPage: number = parseInt(url.searchParams.get('recordsPerPage') || '0', 10);
    const filter: Ifilter = { isDeleted: false };

    if (albumId && type === 'AlbumSongs') return await handleAlbumSongs(req, albumId);

    if (albumId) return await handleAlbumById(albumId);

    if (artistId) filter.Label = artistId;

    if (!recordsPerPage || recordsPerPage === 0) return await handleAllAlbums(filter); 

    return await handlePaginatedAlbums(filter, page, recordsPerPage);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error'+error },
      { status: 500 }
    );
  }
}

async function handleAlbumSongs(req: Request, albumId: string) {
  const album = await db.collection('albums').aggregate(getAlbumPipeline(albumId)).toArray();
  if (!album || !album.length || !album[0].musicDetails) {
    return NextResponse.json(
      { error: 'Album or associated music not found' },
      { status: 404 }
    );
  }
  const musicIds = album[0].musicDetails.map((music: { _id: string }) => music._id);
  const authHeader: string | null = req.headers.get('Authorization');
  const token = authHeader?.split(' ')[1];
  const decodedToken = token ? await auth.verifyIdToken(token) : null;
  const user = decodedToken ? await auth.getUser(decodedToken.uid) : null;
  const musics = await db.collection('musics').aggregate(musicAggregationPipeline(musicIds, user?.uid)).toArray();
  return NextResponse.json({ status: 200, data: musics });
}

async function handleAlbumById(albumId: string) {
  const album = await db.collection('albums').aggregate(getAlbumByIDPipeline(albumId)).toArray();
  if (!album || album.length === 0 || !album[0].musicDetails) {
    return NextResponse.json({ error: 'Album not found' }, { status: 404 });
  }
  return NextResponse.json({ status: 200, data: album[0] });
}

async function handleAllAlbums(filter: Ifilter) {
  const albumList = await db.collection('albums').aggregate(getAlbumByFilter(filter)).toArray();
  return NextResponse.json({ status: 200, data: albumList });
}

async function handlePaginatedAlbums(filter: Ifilter, page: number, recordsPerPage: number) {
  const skip = (page - 1) * recordsPerPage;
  const albumList = await db.collection('albums').find(filter).skip(skip).limit(recordsPerPage).toArray();
  const totalAlbums = await db.collection('albums').countDocuments(filter);
  return NextResponse.json({
    status: 200,
    data: albumList,
    pagination: {
      page,
      recordsPerPage,
      totalAlbums,
      totalPages: Math.ceil(totalAlbums / recordsPerPage),
    },
  });
}

export async function PUT(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const albumId = url.searchParams.get('id');
    
    const { name, description, genreIds, languageIds, songIds, price } = body;
    const genreNames = JSON.parse(genreIds as string);
    const languageNames = JSON.parse(languageIds as string);
    const songs = JSON.parse(songIds as string).map((id: string) => new mongoose.Types.ObjectId(id));

    const imageBlob = await getImageBlob(formData);
    const genres = await getGenres(genreNames);
    const languages = await getLanguages(languageNames);

    const existingAlbum = await getExistingAlbum(albumId);
    if (!existingAlbum) return NextResponse.json({ error: 'Album not found' }, { status: 404 });

    const updatedImageUrl = await updateImage(existingAlbum as IAlbum, imageBlob, albumId);

    const updatedAlbumData = {
      name: await capitalizeTitle(name.toString()),
      description,
      Price: Number(price),
      imageUrl: updatedImageUrl,
      Genre: genres,
      Language: languages,
      musicIds: songs,
    }; 
    const updatedAlbum = await updateAlbumData(albumId, updatedAlbumData as IAlbum);

    if (updatedAlbum) {
      return NextResponse.json({
        status: 200,
        message: 'Album updated successfully',
        data: updatedAlbum,
      });
    }

    return NextResponse.json({ error: 'Error while updating album' }, { status: 400 });

  } catch (error) {
    return NextResponse.json({ error: `Internal Server Error: ${error}` }, { status: 500 });
  }
}

async function getImageBlob(formData: FormData) {
  const imageField = formData.get('image');
  return imageField !== 'undefined' && imageField ? imageField as Blob : undefined;
}

async function getGenres(genreNames: string[]) {
  const genres = await db.collection('genres')
    .find({ name: { $in: genreNames } })
    .project({ _id: 1 })
    .toArray();
  return (genres as IGenre[]).map((genre) => genre._id);
}

async function getLanguages(languageNames: string[]) {
  const languages = await db.collection('languages')
    .find({ name: { $in: languageNames } })
    .project({ _id: 1 })
    .toArray();
  return (languages as ILanguage[]).map((language) => language._id);
}

async function getExistingAlbum(albumId: string | null) {
  return db.collection('albums').findOne({ _id: new mongoose.Types.ObjectId(albumId || '') });
}

async function updateImage(existingAlbum:IAlbum, imageBlob: Blob | undefined, albumId: string | null) {
  let updatedImageUrl:string|null = existingAlbum.imageUrl;

  if (imageBlob instanceof Blob) {
    const oldFilePath = path.join(ALBUM_IMAGE_UPLOAD_DIR, path.basename(existingAlbum.imageUrl as string));

    if (existingAlbum.imageUrl && !(await db.collection('albums').countDocuments({
      imageUrl: existingAlbum.imageUrl,
      _id: { $ne: new mongoose.Types.ObjectId(albumId || '') }, 
    }))) {
      try {
        await fs.unlink(oldFilePath); 
      } catch (err) {
        if(err instanceof Error)
        {
          throw new Error('Error deleting old file:', err);
        }
      }
    }

    updatedImageUrl = await saveFiles(imageBlob, ALBUM_IMAGE_UPLOAD_DIR);
  }

  return updatedImageUrl;
}

async function updateAlbumData(albumId: string | null, updatedAlbumData: IAlbum) {
  return await db.collection('albums').findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(albumId || '') },
    { $set: updatedAlbumData },
    { returnDocument: 'after' }
  );
}


 
export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const albumId = url.searchParams.get('id');
    if (!albumId) {
      return NextResponse.json(
        { error: 'Album ID is required' },
        { status: 400 }
      );
    }
    // Check if the album exists
    const existingAlbum = await db.collection('albums').findOne({
      _id: new mongoose.Types.ObjectId(albumId),
    });
    if (!existingAlbum) {
      return NextResponse.json(
        { error: 'Album not found' },
        { status: 404 }
      );
    }
    const oldFilePath = path.join(ALBUM_IMAGE_UPLOAD_DIR, path.basename(existingAlbum.imageUrl));
    await fs.unlink(oldFilePath); // Delete the old file
    const updatedAlbum = await db.collection('albums').findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(albumId) },
      { 
        $set: { 
          isDeleted: true,
          imageUrl: null 
        }
      },
      { returnDocument: 'after' }
    );

    return NextResponse.json({
      status: 200,
      message: 'Album marked as deleted successfully',
      data: updatedAlbum,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error},
      { status: 500 }
    );
  }
}