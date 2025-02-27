import { v2 as cloudinary } from 'cloudinary'; 
import { NextResponse } from 'next/server';
import { auth } from '@/lib/firebase/firebaseAdmin/auth';
import { db } from '@/lib/DbConnection/dbConnection';
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export async function GET(req: Request) {
  try {
    const authHeader: string|null = req.headers.get('Authorization');
    const token = authHeader?.split(' ')[1];
    const decodedToken = await auth.verifyIdToken(token as string);
    const user = await auth.getUser(decodedToken.uid);
    const userRef = await db.collection('users').findOne({ userId: user?.uid });
    return NextResponse.json({
      status: 200,
      message: 'User data fetched successfully',
      data: userRef,
    });
  } catch (error) {
    return NextResponse.json({ status: 500, error:error,message: 'Error occurred' });
  }
}

export async function PUT(req: Request) {
  try {
    const authHeader: string|null = req.headers.get('Authorization');
    const token = authHeader?.split(' ')[1];
    const decodedToken = await auth.verifyIdToken(token as string);
    const user = await auth.getUser(decodedToken.uid);
    const body = await req.json();
    const { email, firstName, lastName, dob, gender, imageUrl } = body;
    const updatedData = {
      ...(email && { email: email }),
      ...(gender && { gender: gender }),
      ...(firstName && { firstName: firstName }),
      ...(lastName && { lastName: lastName }),
      ...(imageUrl && { imageUrl: imageUrl }),
      ...(dob && {
        dateOfBirth: new Date(dob.year, dob.month - 1, dob.day + 1),
      }),
    };
    const userRef = await db
      .collection('users')
      .updateOne({ userId: user?.uid }, { $set: updatedData });
    if (userRef.modifiedCount === 0) {
      return NextResponse.json({
        status: 404,
        message: 'No changes made or user not found',
      });
    }
    return NextResponse.json({
      status: 200,
      message: 'User details updated successfully',
      data: updatedData,
    });
  } catch (error) {
    return NextResponse.json({ status: 500,error:error, message: 'Error occurred' });
  }
}
