 
import { NextRequest, NextResponse } from 'next/server';
import { MusicDocument } from '@/common/types/types';
import { auth } from '@/lib/firebase/firebaseAdmin/auth';
import { db } from '@/lib/DbConnection/dbConnection';

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);

    const type = searchParams.get('type');
    const id = searchParams.get('id');
    const authHeader: string|null = req.headers.get('Authorization');
    const token = authHeader?.split(' ')[1];
    const decodedToken = await auth.verifyIdToken(token as string);
    const user = await auth.getUser(decodedToken.uid);
    if (!type || !id) {
      return NextResponse.json(
        { message: 'Both \'type\' and \'id\' parameters are required.' },
        { status: 400 }
      );
    }

    let filter = {};
    switch (type) {
    case 'genre':
      filter = { 'musicDetails.genreId': id };
      break;
    case 'playlist':
      filter = { 'musicDetails.playlistId': id };
      break;
    case 'artistId':
      filter = { 'musicDetails.artistId': id };
      break;
    default:
      return NextResponse.json(
        { message: 'Invalid \'type\' parameter.' },
        { status: 400 }
      );
    }

    // Query the database
    const musics = await db.collection('musics').aggregate([
      { $match: filter },
      {
        $lookup: {
          from: 'artists', 
          let: { artistsIds: '$musicDetails.artistId' },
          pipeline: [
            {
              $match: { 
                $expr: { $in: ['$_id', { $ifNull: ['$$artistsIds', []] }] },
              }
            },
            {
              $project: { userId: 1, _id: 0 }
            }
          ],
          as: 'artistInfo'
        }
      },
      {
        $lookup: {
          from: 'users', 
          localField: 'artistInfo.userId', 
          foreignField: '_id', 
          as: 'userInfo'
        }
      },
      {
        $addFields: {
          'artists': {
            $reduce: {
              input: '$userInfo',
              initialValue: '',
              in: {
                $cond: {
                  if: { $eq: ['$$value', ''] },
                  then: { $concat: ['$$this.firstName', ' ', '$$this.lastName'] },
                  else: { $concat: ['$$value', ', ', '$$this.firstName', ' ', '$$this.lastName'] }
                }
              }
            }
          }
        }
      },
      {
        $lookup: {
          from: 'users',
          pipeline: [
            { $match: { userId: user.uid } },
            { $project: { likedMusics: 1 } }
          ],
          as: 'loggedInUser',
        },
      },
      {
        $unwind: {
          path: '$loggedInUser',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          liked: { $in: ['$_id', { $ifNull: ['$loggedInUser.likedMusics', []] }] },
          peaks: '$audioDetails.peaks' ,
        },
      },
      {
        $group: {
          _id: '$_id', // Group by _id to remove duplicates
          musicDetails: { $first: '$$ROOT' }, // Keep the first occurrence
        }
      },
      {
        $replaceRoot: { newRoot: '$musicDetails' } // Replace the root with the grouped music details
      },
    ]).toArray() as MusicDocument[];
        

    if (!musics || musics.length === 0) {
      return NextResponse.json(
        { message: `No music found for type: ${type} and id: ${id}.` },
        { status: 404 }
      );
    }


    const formattedResults = musics.map((doc: MusicDocument) => ({
      _id: doc._id,
      name: doc.musicDetails?.name,
      description: doc.musicDetails?.description,
      duration: doc.musicDetails?.duration,
      artists: doc.artists || '', 
      genreId: doc.musicDetails?.genreId,
      languageId: doc.musicDetails?.languageId,
      releaseDate: doc.musicDetails?.releaseDate,
      audioUrl: doc.audioDetails?.audioUrl,
      imageUrl: doc.audioDetails?.imageUrl,
      playTime: doc.playTime,
      liked: doc.liked,
      price: {
        amount: doc.price?.amount,
        currency: doc.price?.currency,
      },
      peaks:doc.peaks,
      isDeleted: doc.isDeleted,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      type
    }));

    return NextResponse.json({ status: 200, data: formattedResults });
  } catch (error) {
    return NextResponse.json(
      { error: error},
      { status: 500 }
    );
  }
};


