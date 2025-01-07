import { NextRequest, NextResponse } from 'next/server'; 
import { currentUser } from '@clerk/nextjs/server'; 
import { db } from '../user/route';


export async function GET(req : NextRequest) {
  try {
    const queryParams = req.nextUrl.searchParams;
    const UserId = queryParams.get('id');  
    const limit = parseInt(queryParams.get('limit') || "0", 10); 
    const user: any|null = await currentUser();
    console.log("skip" , limit)
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
                $match: { clerkUserId: user?.id || UserId  },
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
            liked: { $in: ['$_id', '$loggedInUser.likedGenres'] },
          },
        },
        {
          $project: {
            _id: 1,
            name: '$musicDetails.name',
            playCount: 1,
            genre: '$name',
            genreId: '$_id',
            imageUrl: '$imageUrl' ,
            liked:1
          
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
          $sort: { totalPlayTime: -1,_id:1 },
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

      console.log("GENRES : " , genres , genres.length)
    return NextResponse.json({ status: 200, data: genres });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ status: 500, message: 'Error occurred' });
  }
}
