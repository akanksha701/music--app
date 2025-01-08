import { NextResponse } from 'next/server';
import { TAGS } from '@/app/(BrowsePage)/Browse/types/types';
import mongoose, { Types } from 'mongoose';
import { db } from '../user/route';
import { auth } from '@/lib/firebase/firebaseAdmin/auth';

async function handleMusicLike(user: any, id: string, userId: string) {
  const alreadyLiked = user.likedMusics.some((likedMusic: Types.ObjectId) =>
    likedMusic.equals(new mongoose.Types.ObjectId(id))
  );

  const updatedUser = await db.collection('users').findOneAndUpdate(
    { userId },
    {
      [alreadyLiked ? '$pull' : '$addToSet']: {
        likedMusics: new mongoose.Types.ObjectId(id),
      },
    },
    { returnDocument: 'after' }
  );
  return updatedUser;
}

async function handleAlbumLike(user: any, id: string, userId: string) {
  const alreadyLiked = user.likedMusics.some((likedAlbums: Types.ObjectId) =>
    likedAlbums.equals(new mongoose.Types.ObjectId(id))
  );
  const updatedUser = await db.collection('users').findOneAndUpdate(
    { userId },
    {
      [alreadyLiked ? '$pull' : '$addToSet']: {
        likedAlbums: new mongoose.Types.ObjectId(id),
      },
    },
    { returnDocument: 'after' }
  );

  return updatedUser;
}

async function handleGenreLike(user: any, id: string, userId: string) {
  const alreadyLiked = user.likedGenres.some((likedGenres: Types.ObjectId) =>
    likedGenres.equals(new mongoose.Types.ObjectId(id))
  );
  const updatedUser = await db.collection('users').findOneAndUpdate(
    { userId },
    {
      [alreadyLiked ? '$pull' : '$addToSet']: {
        likedGenres: new mongoose.Types.ObjectId(id),
      },
    },
    { returnDocument: 'after' }
  );
  return updatedUser;
}

export async function POST(req: Request) {
  try {
    const authHeader: any = req.headers.get('Authorization');
    const token = authHeader.split(' ')[1];
    const decodedToken = await auth.verifyIdToken(token);
    const userDetails = await auth.getUser(decodedToken.uid);
    const { id, name } = await req.json();

    const user = await db
      .collection('users')
      .findOne({ userId: userDetails?.uid });
    if (!user) {
      return NextResponse.json({ message: 'User not found.' }, { status: 404 });
      return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    }

    let updatedUser;
    switch (name) {
    case TAGS.MUSIC:
      updatedUser = await handleMusicLike(
        user,
        id,
          userDetails?.uid as string
      );
      break;
    case TAGS.NEW_RELEASE:
      updatedUser = await handleMusicLike(
        user,
        id,
          userDetails?.uid as string
      );
      break;

    case TAGS.ALBUMS:
      updatedUser = await handleAlbumLike(
        user,
        id,
          userDetails?.uid as string
      );
      break;

    case TAGS.GENRE:
      updatedUser = await handleGenreLike(
        user,
        id,
          userDetails?.uid as string
      );
      break;

    default:
      return NextResponse.json(
        { message: 'Invalid media type.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      status: 200,
      data: {},  // Removed data from the response ( Updated user object )
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Something went wrong.' },
      { status: 500 }
    );
  }
}
