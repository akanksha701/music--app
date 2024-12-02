import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/DbConnection/dbConnection';
import Category from '@/lib/models/Category';

export async function GET() {
  try {
    await dbConnect();
    const categoryList = await Category.find({});
    if (categoryList) {
      return NextResponse.json({ status: 200, data: categoryList });
    }
    return NextResponse.json(
      { error: 'error while fetching categories' },
      { status: 400 }
    );
  } catch (error) {
    console.log(error, 'error');
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
