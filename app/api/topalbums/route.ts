import { NextResponse } from 'next/server';
import { currentUser, User } from '@clerk/nextjs/server';
import { db } from '../user/route';



export async function GET() {
  try {
    const user: User | null = await currentUser();
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
          $match: {
            $or: [{ musicIds: { $ne: [] } }],
          },
        },
        {
          $lookup: {
            from: 'users',
            pipeline: [
              {
                $match: { clerkUserId: user?.id },
              },
              {
                $project: { likedAlbums: 1 },
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
          $unwind: {
            path: '$musicDetails',
            preserveNullAndEmptyArrays: true,
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
      ])
      .toArray();

    return NextResponse.json({ status: 200, data: albums });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ status: 500, message: 'Error occurred' });
  }
}
