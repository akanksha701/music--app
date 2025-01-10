import { NextResponse } from 'next/server';
import { db } from '../../user/route';
import { auth } from '@/lib/firebase/firebaseAdmin/auth';

export async function GET(req: Request,{ }: { params: { slug: string } }) {
  try {
    const authHeader:string|null = req.headers.get('Authorization');
    const token = authHeader?.split(' ')[1];
    const decodedToken = await auth.verifyIdToken(token as string);
    const user = await auth.getUser(decodedToken.uid);

    if (!user) {
      return NextResponse.json({
        status: 401,
        message: 'Unauthorized',
      });
    }
    const musics = await db
      .collection('users')
      .aggregate([
        {
          $match: {
            userId: user.uid,
          },
        },
        {
          $lookup: {
            from: 'artists',
            localField: '_id',
            foreignField: 'userId',
            as: 'artistDetails',
          },
        },
        {
          $unwind: {
            path: '$artistDetails',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'musics',
            let: { artistId: '$artistDetails._id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ['$$artistId', '$musicDetails.artistId'],
                  },
                },
              },
            ],
            as: 'musics',
          },
        },
        {
          $unwind: {
            path: '$musics',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'genres',
            let: { genreId: '$musics.musicDetails.genreId' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$_id', '$$genreId'],
                  },
                },
              },
            ],
            as: 'genreDetails',
          },
        },
        {
          $lookup: {
            from: 'languages',
            let: { languageId: '$musics.musicDetails.languageId' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$_id', '$$languageId'],
                  },
                },
              },
            ],
            as: 'languageDetails',
          },
        },
        {
          $project: {
            name: '$musics.musicDetails.name',
            description: '$musics.musicDetails.description',
            releaseDate: '$musics.musicDetails.releaseDate',
            duration: '$musics.musicDetails.duration',
            audioUrl: '$musics.audioDetails.audioUrl',
            imageUrl: '$musics.audioDetails.imageUrl',
          },
        },
      ])
      .toArray();
    return NextResponse.json({
      status: 200,
      data: musics,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error:error,
      message: 'Error occurred',
    });
  }
}
