import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { db } from '../user/route';


export async function GET() {
  try {
    const user: any = await currentUser();
    const genres = await db.collection('genres').aggregate([
        {
          $lookup: {
            from: 'genres',
            localField: 'musicDetails.genreId',
            foreignField: '_id',
            as: 'genreDetails',
          },
        },
        {
          $lookup: {
            from: 'users',
            pipeline: [
              {
                $match: { clerkUserId: user.id },
              },
              {
                $project: { likedGenres: 1 },
              },
            ],
            as: 'loggedInUser',
          },
        },
        {
          $unwind: {
            path: '$genreDetails',
            preserveNullAndEmptyArrays: true,
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
            liked: { $in: ['$genreDetails._id', '$loggedInUser.likedGenres'] },
          },
        },
        {
          $project: {
            _id: 1,
            name: '$musicDetails.name',
            playCount: 1,
            genre: '$genreDetails.name',
            genreId: '$genreDetails._id',
            imageUrl: '$genreDetails.imageUrl' ,
            liked:1
          
          },
        },
        {
          $group: {
            _id: '$genreId',
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
          $sort: { totalPlayTime: -1 },
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
          },
        },
      ]).toArray();

    return NextResponse.json({ status: 200, data: genres });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ status: 500, message: 'Error occurred' });
  }
}
