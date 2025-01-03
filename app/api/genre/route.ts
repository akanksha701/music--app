import { NextRequest, NextResponse } from 'next/server';
import { NextApiRequest } from 'next';
import { capitalizeTitle, saveFiles } from '@/utils/helpers';
import { GENRE_IMAGE_UPLOAD_DIR } from '../music/route';
import { db } from '../user/route';
import mongoose from 'mongoose';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const image = (body.image as Blob) || null;
    const { name, description } = body;
    const newGenre = await db.collection('genres').insertOne({
      name: await capitalizeTitle(name.toString()),
      description: description,
      imageUrl: image ? await saveFiles(image, GENRE_IMAGE_UPLOAD_DIR) : null,
    });
    if (newGenre) {
      return NextResponse.json({
        status: 200,
        message: 'new genre created successfully',
        data: newGenre,
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
    const updatedGenre = await db
      .collection('genres')
      .findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(id) },
        { name, description },
        { returnDocument: 'after' }
      );

    if (updatedGenre) {
      return NextResponse.json({
        status: 200,
        data: updatedGenre,
      });
    }

    return NextResponse.json({ error: 'genre not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req?.url as string);
    const page: number = parseInt(url?.searchParams?.get('page') || '1', 10); // Default page is 1
    const recordsPerPage = parseInt(
      url?.searchParams?.get('recordsPerPage') || '10',
      10
    ); // Default records per page is 10

    // Pagination logic
    const skip = (page - 1) * recordsPerPage;
    const limit = recordsPerPage;

    // If pagination parameters are found, apply skip and limit
    const genreList = await db
      .collection('genres')
      .find({})
      .skip(skip)
      .limit(limit).toArray();

    // Get total count of genres for pagination info
    const totalGenres = await db.collection('genres').countDocuments();

    if (genreList) {
      return NextResponse.json({
        status: 200,
        data: genreList,
        pagination: {
          page,
          recordsPerPage,
          totalGenres,
          totalPages: Math.ceil(totalGenres / recordsPerPage), // Calculate total pages
        },
      });
    }

    return NextResponse.json(
      { error: 'Error while fetching genres' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextApiRequest) {
  try {
    const url = new URL(req?.url as string);
    const id = url?.searchParams?.get('id');

    if (id === null) {
      throw new Error('ID cannot be null');
    }

    const deletedGenre = await db
      .collection('genres')
      .findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) });

    if (deletedGenre) {
      return NextResponse.json({
        status: 200,
        message: 'genre deleted successfully',
      });
    }

    return NextResponse.json({ error: 'genre not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
