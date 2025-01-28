
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { db } from '@/lib/DbConnection/dbConnection';


async function updateAverageRating(avgRatingResult: Array<{ _id: string, averageRating: number }>, genreId: string) {
  if (avgRatingResult.length === 0) {
    throw new Error('Failed to calculate average rating. No ratings found.');
  }
  const averageRating = avgRatingResult[0].averageRating;
  const updateResult = await db.collection('genres').findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(genreId) },
    { $set: { rating: averageRating } }
  );
  if (!updateResult) {
    throw new Error('Failed to update the music details with the new average rating.');
  }
}
export async function POST(req: Request) {
  try {
    const { userId, genreId, rating } = await req.json();
    if (!userId || !genreId || typeof rating !== 'number' || rating < 1 || rating > 5) {
      return NextResponse.json(
        { message: 'Invalid input data. Please provide a valid userId, genreId, and a rating between 1 and 5.' }, 
        { status: 400 }
      );
    }

    const existingRating = await db.collection('musicratings').findOne({
      userId: new mongoose.Types.ObjectId(userId),
      genreId: new mongoose.Types.ObjectId(genreId),
    });

    if (existingRating) {
      return NextResponse.json(
        { message: 'You have already rated this music.' }, 
        { status: 403 }
      );
    }

    const insertResult = await db.collection('musicratings').insertOne({
      userId: new mongoose.Types.ObjectId(userId),
      genreId: new mongoose.Types.ObjectId(genreId),
      rating: rating,
    });

    if (!insertResult.acknowledged) {
      throw new Error('Failed to insert the rating into the database.');
    }

    const avgRatingResult = await db.collection('musicratings').aggregate([
      {
        $match: {
          genreId: new mongoose.Types.ObjectId(genreId),
          rating: { $exists: true },
        },
      },
      {
        $group: {
          _id: '$genreId',
          averageRating: { $avg: '$rating' },
        },
      },
    ]).toArray();
   
   
    await updateAverageRating(avgRatingResult as Array<{ _id: string, averageRating: number }>,genreId);

    return NextResponse.json(
      { message: 'Rating submitted and music details updated successfully.' },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { error: error  || 'Internal server error.', message: 'Failed to submit rating.' },
      { status: 500 }
    );
  }
}
