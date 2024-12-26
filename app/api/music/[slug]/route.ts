import { currentUser } from '@clerk/nextjs/server';
import dbConnect from '@/lib/DbConnection/dbConnection';
import { NextResponse } from 'next/server';
import User from '@/lib/models/User';

export async function GET(req: any, { params }: { params: { slug: string } }) {
  try {
    await dbConnect();
    const user: any = await currentUser();

    if (!user) {
      return NextResponse.json({
        status: 401,
        message: 'Unauthorized',
      });
    }
    const musics = await User.aggregate([
      {
        $match: {
          clerkUserId: user.id,
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
    ]);
    return NextResponse.json({
      status: 200,
      data: musics,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({
      status: 500,
      message: 'Error occurred',
    });
  }
}
