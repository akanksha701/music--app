import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";
import dbConnect from "@/lib/DbConnection/dbConnection";
import User from "@/lib/models/User";
import { getUser } from "@/app/actions/getUser";
import { redirect } from "next/navigation";
import { CalendarDate, parseDate } from "@internationalized/date";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    if (!body.userId) {
      return redirect("/Signin");
    }
    const day = new Date(body?.dob).getDate();
    const month = new Date(body?.dob).getMonth();
    const year = new Date(body?.dob).getFullYear();

    const params = {
      firstName: body?.firstName,
      lastName: body?.lastName,
      unsafeMetadata: {
        gender: body?.gender,
        dob: new CalendarDate(year, month, day),
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
          dateOfBirth: body?.date,
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
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
