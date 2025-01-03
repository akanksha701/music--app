import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/DbConnection/dbConnection';
import { capitalizeTitle } from '@/utils/helpers';
import { db } from '../user/route';
import mongoose from 'mongoose';

export async function POST(req: NextRequest) {
  try {
    const body = await req?.json();
    const { name, description } = body;
    const newLanguage = await db.collection('languages').insertOne({
      name: await capitalizeTitle(name.toString()),
      description: description,
    });
    if (newLanguage) {
      return NextResponse.json({
        status: 200,
        message: 'new message created successfully',
        data: newLanguage,
      });
    }
    return NextResponse.json(
      { error: 'error while creating genres' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const url = new URL(req?.url as string);
    const id = url?.searchParams?.get('id');
    const body = await req?.json();

    const { name, description } = body;
    if (id === null) {
      throw new Error('ID cannot be null');
    }
    const updatedLanguage = await db
      .collection('languages')
      .findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(id) },
        { name, description },
        { returnDocument: 'after' }
      );

    if (updatedLanguage) {
      return NextResponse.json({
        status: 200,
        data: updatedLanguage,
      });
    }

    return NextResponse.json({ error: 'language not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const page: any = parseInt(url.searchParams.get('page') || '1', 10); // Default to page 1
    const recordsPerPage: any = parseInt(
      url.searchParams.get('recordsPerPage') || '0',
      10
    ); // Default to 0 (no pagination)
    if (!recordsPerPage || !page) {
      const languageList = await db.collection('languages').find({}).toArray();
      return NextResponse.json({
        status: 200,
        data: languageList,
      });
    }

    // Pagination logic if recordsPerPage is provided
    const skip = (page - 1) * recordsPerPage;
    const limit = recordsPerPage;

    // Fetch paginated data
    const languageList = await db
      .collection('languages')
      .find({})
      .skip(skip)
      .limit(limit).toArray();

    // Get total count for pagination
    const totalLanguages = await db.collection('languages').countDocuments();
    return NextResponse.json({
      status: 200,
      data: languageList,
      pagination: {
        page,
        recordsPerPage,
        totalLanguages,
        totalPages: Math.ceil(totalLanguages / recordsPerPage), // Calculate total pages
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req?.url);
    const id = url?.searchParams?.get('id');
    if (id === null) {
      throw new Error('ID cannot be null');
    }
    const deletedLanguage = await db
      .collection('languages')
      .findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) });

    if (deletedLanguage) {
      return NextResponse.json({
        status: 200,
        message: 'language deleted successfully',
      });
    }

    return NextResponse.json({ error: 'language not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
