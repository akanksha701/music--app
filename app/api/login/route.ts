import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

interface User{
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActive: boolean;
  isDeleted: boolean;
  gender: string;
  dateOfBirth: Date;
  mobileNumber: number;
}
const users: User[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'password123',
    isActive: true,
    isDeleted: false,
    gender: 'male',
    dateOfBirth: new Date('1990-01-01'),
    mobileNumber: 1234567890,
  },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password} = body;

    // Find user with matching credentials
    const user = users.find(u =>  u.email === email);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch){
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    // Don't send password in response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: 'Login successful',
      user: userWithoutPassword
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
