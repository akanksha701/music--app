import { NextRequest, NextResponse } from 'next/server';
import User from '@/lib/models/User';
export async function POST(req: NextRequest) {
  try {
    
    const body = await req.json();
    const { id, emailAddresses, firstName, lastName } = body.user;
    const userExisted = await User.findOne({ clerkUserId: id });
    if (userExisted) {
      return await NextResponse.json({
        status: 409,
        message: 'The user already exists',
      });
    } else {
      const newUser = await User.create({
        clerkUserId: id,
        firstName: firstName,
        lastName: lastName,
        email: emailAddresses[0]?.emailAddress,
        isActive: true,
        isDeleted: false,
      });
      if (newUser) {
        return NextResponse.json({ status: 200, data: newUser });
      }
      return NextResponse.json(
        { error: 'error while creating new user' },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const users = await User.find();
    return NextResponse.json({ users });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
