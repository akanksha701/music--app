import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/DbConnection/dbConnection';
import { getloggedInUser } from '../user/route';

export async function GET(req: NextRequest) {
  try {
    const user =await getloggedInUser(req);
    const queryParams = req.nextUrl.searchParams;
    const limit:number = parseInt(queryParams.get('limit') || '0', 10); 
    const genres = await db
      .collection('genres')
      .aggregate([
        {
          $lookup: {
            from: 'genres',
            localField: 'musicDetails.genreId',
            foreignField: '_id',
            as: 'genreDetails',
          },
        },
        {
          $unwind: {
            path: '$genreDetails',
            preserveNullAndEmptyArrays: true,
          },
        },
        // {
        //   $lookup: {
        //     from: 'users',
        //     pipeline: [
        //       {
        //         $match: { userId: user?.uid },
        //       },
        //       {
        //         $project: { likedGenres: 1 },
        //       },
        //     ],
        //     as: 'loggedInUser',
        //   },
        // },
        {
          $lookup: {
            from: 'users',
            pipeline: user?.uid
              ? [{ $match: { userId: user?.uid } }, { $project: { likedGenres: 1 } }]
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
              genreId: '$_id'
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$userId', '$$userId'] }, // Match the userId
                      { $eq: ['$genreId', '$$genreId'] }
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
            liked: { $in: ['$_id', { $ifNull: ['$loggedInUser.likedGenres', []] }] }, // Liked logic from album pipeline
          },
        },
        {
          $project: {
            _id: 1,
            ratingGiven:1,
            ratingByUser:1,
            name: '$musicDetails.name',
            playCount: 1,
            genre: '$name',
            genreId: '$_id',
            imageUrl: '$imageUrl',
            liked: 1, // Ensure liked is included in the output
          },
        },
        // { $limit: limit },
        {
          $group: {
            _id: '$_id',
            ratingByUser: { $first: '$ratingByUser.rating' },
            isRatingGiven: { $first: '$ratingGiven' },
            name: { $first: '$genre' },
            imageUrl: { $first: '$imageUrl' },
            liked: { $first: '$liked' },
            musics: {
              $push: {
                id: '$_id',
                playCount: '$playCount',
                name: '$name',
              },
            },
            totalPlayTime: { $sum: '$playCount' },
          },
        },
        {
          $sort: { totalPlayTime: -1, _id: 1 },
        },
        {
          $addFields: {
            musics: {
              $sortArray: {
                input: '$musics',
                sortBy: { playCount: -1 },
              },
            },
          },
        },
        {
          $project: {
            name: 1,
            totalPlayTime: 1,
            musics: 1,
            imageUrl: 1,
            liked: 1, 
            ratingByUser:1,
            isRatingGiven:1
          },
        },
      ])
      .toArray();
    
    return NextResponse.json({ status: 200, data: genres });
  } catch (error) {
    return NextResponse.json({ status: 500,error:error, message: 'Error occurred' });
  }
}
