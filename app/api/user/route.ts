import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";
import dbConnect from "@/lib/DbConnection/dbConnection";
import User from "@/lib/models/User";
import { revalidatePath } from "next/cache";
import { getUser } from "@/app/actions/getUser";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: any, res: NextApiResponse) {
  try {
    await dbConnect();
    const { userId } = await auth();
    const body = await req.json();
    if (!userId) {
      return NextResponse.redirect("/Signin");
    }
    const params = {
      firstName: body?.firstName,
      lastName: body?.lastName,
      unsafeMetadata: {
        gender: body?.gender,
        dob: body?.dob,
        imageUrl: body?.imageUrl,
      },
    };
    const client = await clerkClient();
    const date = new Date(
      `${body?.dob?.year}-${body?.dob?.month}-${body?.dob?.day}`
    );
    const updatedUser = await client.users.updateUser(userId, params);
    if (updatedUser) {
      const updatedUserDetails = await User.findOneAndUpdate(
        { clerkUserId: userId },
        {
          gender: body?.gender,
          dateOfBirth: date,
          imageUrl: body?.imageUrl,
          firstName: body?.firstName,
          lastName: body?.lastName,
        },
        {
          new: true,
        }
      );
      await revalidatePath("/myprofile", "page");
      return NextResponse.json({ status: 200, updatedUserDetails });
    }
  } catch (error) {
    return NextResponse.json({ error: error, status: 500 });
  }
}

export async function GET() {
  try {
    const user = await getUser()
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
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