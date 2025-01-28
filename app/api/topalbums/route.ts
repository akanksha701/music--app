import { NextRequest, NextResponse } from 'next/server'; 
import { db } from '@/lib/DbConnection/dbConnection';
import { getloggedInUser } from '../user/route';

export async function GET(req:NextRequest) {
  try {
    const user =await getloggedInUser(req);
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
            pipeline: user?.uid
              ? [{ $match: { userId: user?.uid } }, { $project: { likedMusics: 1 } }]
              : [],
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
  } catch (error) {
    return NextResponse.json({ status: 500,error:error, message: 'Error occurred' });
  }
}
