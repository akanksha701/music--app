import { db } from '@/lib/DbConnection/dbConnection';
import { NextResponse } from 'next/server';
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
            _id:0,
            id: '$_id',
            fullname: {
              $concat: ['$userDetails.firstName', ' ', '$userDetails.lastName'],
            },
          },
        },
      ]).toArray();

    return NextResponse.json({ status: 200, data: artists });
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 }
   
    );
  }
}
