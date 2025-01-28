import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/DbConnection/dbConnection';
import { getloggedInUser } from '../user/route';

export async function GET(req: NextRequest) {
  try {
    const user =await getloggedInUser(req);
    const musics = await db
      .collection('musics')
      .aggregate([
        {
          $lookup: {
            from: 'artists',
            let: { artistsIds: '$musicDetails.artistId' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ['$userId', { $ifNull: ['$$artistsIds', []] }] // Ensure it's always an array
                  },
                },
              },
            ],
            as: 'artistDetails',
          },
        },
        {
          $lookup: {
            from: 'users',
            let: { artistsIds: '$artistDetails.userId' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ['$_id', { $ifNull: ['$$artistsIds', []] }] // Ensure it's always an array
                  },
                },
              },
            ],
            as: 'artists',
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
        //         $project: { likedMusics: 1 },
        //       },
        //     ],
        //     as: 'loggedInUser',
        //   },
        // },
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
              userIdo: '$loggedInUser._id',
              musicIdo: '$_id'
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$userId', '$$userIdo'] }, // Match the userId
                      { $eq: ['$musicId', '$$musicIdo'] }
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
            liked: { $in: ['$_id', { $ifNull: ['$loggedInUser.likedMusics', []] }] }, // Ensure likedMusics is an array
          },
        },
        {
          $unwind: {
            path: '$artists',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: '$_id',
            name: { $first: '$musicDetails.name' },
            ratingByUser: { $first: '$ratingByUser.rating' },
            isRatingGiven: { $first: '$ratingGiven' },
            description: { $first: '$musicDetails.description' },
            avgRating: { $first: '$musicDetails.rating' },
            duration: { $first: '$musicDetails.duration' },
            artists: {
              $push: {
                $concat: ['$artists.firstName', ' ', '$artists.lastName'],
              },
            },
            liked: { $first: '$liked' },
            email: { $first: '$artists.email' },
            price: { $first: '$price.amount' },
            currency: { $first: '$price.currency' },
            imageUrl: { $first: '$audioDetails.imageUrl' },
            audioUrl: { $first: '$audioDetails.audioUrl' },
            peaks: { $first: '$audioDetails.peaks' },
            playCount: { $first: '$playCount' },
          },
        },
        {
          $addFields: {
            artists: {
              $reduce: {
                input: '$artists',
                initialValue: '',
                in: {
                  $cond: {
                    if: { $eq: ['$$value', ''] },
                    then: '$$this',
                    else: { $concat: ['$$value', ', ', '$$this'] },
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
      ])
      .toArray();
    return NextResponse.json({ status: 200, data: musics });
  } catch (error) {
    return NextResponse.json({ status: 500, error: error, message: 'Error occurred' });
  }
}

