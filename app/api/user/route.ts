import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";
import dbConnect from "@/lib/DbConnection/dbConnection";
import User from "@/lib/models/User";
import { revalidatePath } from "next/cache";
import { getUser } from "@/app/actions/getUser";
import { redirect } from "next/navigation";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: any, res: NextApiResponse) {
  try {
    await dbConnect();
    const body = await req.json();
    if (!body.userId) {
      return redirect("/Signin");
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
    const date = await new Date(
      `${body?.dob?.year}-${body?.dob?.month}-${body?.dob?.day}`
    );
    const updatedUser = await client.users.updateUser(body.userId, params);
    if (updatedUser) {
      User.findOneAndUpdate(
        { clerkUserId: body?.userId },
        {
          gender: body?.gender,
          // dateOfBirth: date,
          imageUrl: body?.imageUrl,
          firstName: body?.firstName,
          lastName: body?.lastName,
        },
        { new: true }
      )
      return NextResponse.json({data:updatedUser, status: 200,  });
    }
  } catch (error) {
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
