import { NextResponse } from 'next/server';
import { db } from '../user/route';
import { auth } from '@/lib/firebase/firebaseAdmin/auth';



export async function GET(req:Request) {
  try {
    const authHeader: any = req.headers.get('Authorization');
    const token = authHeader.split(' ')[1];
    const decodedToken = await auth.verifyIdToken(token);
    const user = await auth.getUser(decodedToken.uid);
    const albums = await await db
      .collection('albums')
      .aggregate([
        {
          $lookup: {
            from: 'musics',
            localField: 'musicIds',
            foreignField: '_id',
            as: 'musicDetails',
          },
        },
      {
        $lookup: {
          from: 'users',
          pipeline: [
            {
              $match: { userId: user?.uid },
            },
            {
              $project: { likedAlbums: 1 },
            },
          ],
          as: 'loggedInUser',
        }
      },
      {
        $unwind: {
          path: '$loggedInUser',
          preserveNullAndEmptyArrays: true,
        },
      },
        {
          $lookup: {
            from: 'users',
            pipeline: [
              {
                $match: { userId: user?.uid },
              },
              {
                $project: { likedAlbums: 1 },
              },
            ],
            as: 'loggedInUser',
          },
        },
      {
        $addFields: {
          liked: { $in: ['$_id', '$loggedInUser.likedAlbums'] },
        },
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          liked: { $first: '$liked' },
          imageUrl: { $first: '$imageUrl' },
          description: { $first: '$description' },
          count: { $sum: '$musicDetails.playCount' },
        },
      },
      {
        $sort: { count: -1, _id: 1 },
      },
    ]).toArray();

    return NextResponse.json({ status: 200, data: albums });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ status: 500, message: 'Error occurred' });
  }
}
