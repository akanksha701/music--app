import { NextResponse } from 'next/server';
import { db } from '../user/route';
import { auth } from '@/lib/firebase/firebaseAdmin/auth';

export async function GET(req: Request) {
  try {
    const authHeader: any = req.headers.get('Authorization');
    const token = authHeader.split(' ')[1];
    const decodedToken = await auth.verifyIdToken(token);
    const user = await auth.getUser(decodedToken.uid);
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
                    $in: ['$_id', { $ifNull: ['$$artistsIds', []] }] // Ensure it's always an array
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
        {
          $lookup: {
            from: 'users',
            pipeline: [
              {
                $match: { userId: user?.uid },
              },
              {
                $project: { likedMusics: 1 },
              },
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
            description: { $first: '$musicDetails.description' },
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
    console.error('Error:', error);
    return NextResponse.json({ status: 500, message: 'Error occurred' });
  }
}
