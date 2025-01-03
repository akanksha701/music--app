import { clerkClient } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import dbConnect from '@/lib/DbConnection/dbConnection';
import User from '@/lib/models/User';
import { getUser } from '@/app/actions/getUser';
import { redirect } from 'next/navigation';
import { getCalendarDate, getDateObject } from '@/utils/helpers';
import client from '@/lib/DbConnection/dbConnection';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export const db = client.db(process.env.DB_NAME || 'music-app');


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.userId) {
      return redirect('/Signin');
    }

    const params = {
      firstName: body?.firstName,
      lastName: body?.lastName,
      unsafeMetadata: {
        gender: body?.gender,
        dob: await getCalendarDate(body?.dob),
        imageUrl: body?.imageUrl,
      },
    };
    const client = await clerkClient();
    const updatedUser = await client.users.updateUser(body.userId, params);
    if (updatedUser) {
      User.findOneAndUpdate(
        { clerkUserId: body?.userId },
        {
          gender: body?.gender,
          dateOfBirth: await getDateObject(body?.dob),
          imageUrl: body?.imageUrl,
          firstName: body?.firstName,
          lastName: body?.lastName,
        },
        { new: true }
      );

      return NextResponse.json({ data: updatedUser, status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error, status: 500 });
  }
}

export async function GET() {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
