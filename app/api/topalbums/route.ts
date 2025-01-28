import { NextResponse } from 'next/server'; 
import { auth } from '@/lib/firebase/firebaseAdmin/auth';
import { db } from '@/lib/DbConnection/dbConnection';



export async function GET(req:Request) {
  try {
    const authHeader: string | null = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        {error: 'Unauthorized: No token provided' },
        { status: 401 }
      );
    }
    const token = authHeader?.split(' ')[1];
    const decodedToken = await auth.verifyIdToken(token);
    const user = await auth.getUser(decodedToken.uid);
    const albums = await db
      .collection('albums')
      .aggregate([
        {
          $match: {
            isDeleted: false
          }
        },
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
            from: 'musicratings',
            let: {
              userId: '$loggedInUser._id',
              albumId: '$_id'
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$userId', '$$userId'] }, // Match the userId
                      { $eq: ['$albumId', '$$albumId'] }
                    ]
                  }
                }
              },
              {
                $project: { _id: 0, rating: 1 }
              }
            ],
            as: 'ratingByUser'
          }
        },
        {
          $unwind: {
            path: '$ratingByUser',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            ratingGiven: {
              $gt: ['$ratingByUser.rating', 0]
            },
            liked: { $in: ['$_id', { $ifNull: ['$loggedInUser.likedAlbums', []] }] }, 
          },
        },
        {
          $group: {
            _id: '$_id',
            ratingByUser: { $first: '$ratingByUser.rating' },
            isRatingGiven: { $first: '$ratingGiven' },
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ status: 500, message: 'Error occurred' });
  }
}
