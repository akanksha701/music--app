import { NextResponse } from 'next/server';
import { db } from '../user/route';

export async function GET() {
  try {
    
    const artists = await  db
      .collection('artists').aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'userDetails',
          },
        },
        {
          $unwind: {
            path: '$userDetails',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 0,
            id: '$userDetails._id',
            fullname: {
              $concat: ['$userDetails.firstName', ' ', '$userDetails.lastName'],
            },
          },
        },
      ]).toArray();

    return NextResponse.json({ status: 200, data: artists });
  } catch (error) {
    console.log('error', error);
  }
}
