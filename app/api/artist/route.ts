import { NextResponse } from 'next/server';
import dbConnect from '@/lib/DbConnection/dbConnection';
import Artist from '@/lib/models/Artist';

export async function GET() {
  try {
    await dbConnect();
    const artists = await Artist.aggregate([
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
    ]);

    return NextResponse.json({ status: 200, data: artists });
  } catch (error) {
    console.log('error', error);
  }
}
