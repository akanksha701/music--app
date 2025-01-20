'use server'; 
import mongoose from 'mongoose';
import { db } from '../DbConnection/dbConnection';
import { IUserDetails } from '@/app/MyProfile/types/types';

export async function createUser(user: IUserDetails) {
  try {
    const newUser = await db.collection('users').insertOne({
      userId: user?.uid,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      imageUrl: user?.imageUrl,
      isActive: true,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    if (newUser.acknowledged) {
      await createArtist(newUser?.insertedId.toString());
      return {
        ...user, // Spread the user data
        _id: newUser.insertedId, // Add the insertedId from MongoDB
      };
    }
  } catch (error) {
    if (error instanceof Error) {
      return null;
    }
  }
}
export async function createArtist(userObjectId: string) {
  try {
    const newArtist = await db.collection('artists').insertOne({
      userId: new mongoose.Types.ObjectId(userObjectId),
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    if (newArtist.acknowledged) {
      return newArtist;
    }
  } catch (error) {
    if (error instanceof Error) {
      return null;
    }
  }
}
export async function checkIfUserExists(user: IUserDetails) {
  try {
    const existedUser = await db.collection('users').aggregate([
      { $match: { userId: user?.uid as string } },
      {
        $lookup: {
          from: 'artists',
          let: { userId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$userId', '$$userId'] }
              }
            }
          ],
          as: 'artistDetails'
        }
      },
      {
        $unwind: {
          path: '$artistDetails',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project:
        {
          firstName: 1,
          lastName: 1,
          email: 1,
          imageUrl: 1,
          isDeleted: 1,
          gender: 1,
          _id: 1,
          userId: 1,
          isActive: 1,
          artistId: '$artistDetails._id'
        }
      },
    ]).toArray();
    if (!existedUser || existedUser.length===0) {
      const newUser = await createUser(user);
      return newUser;
    } else {
      const user = {
        _id: existedUser[0]?._id.toString(),
        userId: existedUser[0]?.userId,
        firstName: existedUser[0]?.firstName,
        lastName: existedUser[0]?.lastName,
        email: existedUser[0]?.email,
        imageUrl: existedUser[0]?.imageUrl,
        isActive: existedUser[0]?.isActive,
        isDeleted: existedUser[0]?.isDeleted,
        gender: existedUser[0]?.gender,
        artistId:existedUser[0]?.artistId
      };
      return JSON.stringify(user);
    }
  } catch (error) {
    if (error instanceof Error) {
      return false;
    }
  }
}
