import { NextRequest, NextResponse } from 'next/server';
import { db } from '../user/route';
import { auth } from '@/lib/firebase/firebaseAdmin/auth';

export async function GET(req: NextRequest) {
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
    const queryParams = req.nextUrl.searchParams;
    const limit = parseInt(queryParams.get('limit') || '0', 10); 
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
        {
          $lookup: {
            from: 'users',
            pipeline: [
              {
                $match: { userId: user?.uid },
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
            path: '$loggedInUser',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            liked: { $in: ['$_id', { $ifNull: ['$loggedInUser.likedGenres', []] }] }, // Liked logic from album pipeline
          },
        },
        {
          $project: {
            _id: 1,
            name: '$musicDetails.name',
            playCount: 1,
            genre: '$name',
            genreId: '$_id',
            imageUrl: '$imageUrl',
            liked: 1, // Ensure liked is included in the output
          },
        },
        { $limit: limit },
        {
          $group: {
            _id: '$_id',
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
            liked: 1, // Keep liked in the final projection
          },
        },
      ])
      .toArray();
    
    return NextResponse.json({ status: 200, data: genres });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ status: 500, message: 'Error occurred' });
  }
}
