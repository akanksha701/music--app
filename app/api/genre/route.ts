import { NextRequest, NextResponse } from 'next/server';
import { capitalizeTitle, saveFiles } from '@/utils/helpers';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs/promises';
import { GENRE_IMAGE_UPLOAD_DIR } from '../music/exports';
import { db } from '@/lib/DbConnection/dbConnection';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const { name, description } = body;

    const image = body.image || null;

    const imageUrl =
      image && image !== 'undefined'
        ? await saveFiles(image as Blob, GENRE_IMAGE_UPLOAD_DIR)
        : '/genres/images/default.jpg'; // Replace with your default image URL.

    const newGenre = await db.collection('genres').insertOne({
      name: await capitalizeTitle(name.toString()),
      description: description,
      imageUrl: imageUrl,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (newGenre) {
      return NextResponse.json({
        status: 200,
        message: 'New genre created successfully',
        data: newGenre,
      });
    }

    return NextResponse.json(
      { error: 'Error while creating genres' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 }
   
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const url = new URL(req.url as string);
    const id = url.searchParams.get('id');

    if (!id) {
      throw new Error('ID cannot be null');
    }

    const img = body?.img || null;
    const { name, description } = body;

    let imageUrl;

    const existingGenre = await db
      .collection('genres')
      .findOne({ _id: new mongoose.Types.ObjectId(id) });

    if (!existingGenre) {
      return NextResponse.json({ error: 'Genre not found' }, { status: 404 });
    }

    // If a new image is passed, delete the old image and upload the new one
    if (img instanceof Blob) {
      if (existingGenre?.imageUrl) {
        const oldFilePath = path.join(
          GENRE_IMAGE_UPLOAD_DIR,
          path.basename(existingGenre.imageUrl)
        );

        try {
          await fs.unlink(oldFilePath); // Delete the old image file
        } catch (err) {
          return NextResponse.json(
            { error: err },
            { status: 500 }
         
          );
        }
      }

      imageUrl = await saveFiles(img, GENRE_IMAGE_UPLOAD_DIR);
    } else {
      imageUrl = existingGenre?.imageUrl;
    }

    const updatedGenre = await db.collection('genres').findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      {
        $set: {
          name,
          description,
          imageUrl,
        },
      },
      { returnDocument: 'after' }
    );

    // If the genre is updated successfully, return the updated genre
    if (updatedGenre) {
      return NextResponse.json({
        status: 200,
        data: updatedGenre,
      });
    }

    return NextResponse.json({ error: 'Genre not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json(
      { error:error },
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
      .find({ isDeleted: false })
      .skip(skip)
      .limit(limit)
      .toArray();

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
      { error: error },
      { status: 500 }
   
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req?.url as string);
    const id = url?.searchParams?.get('id');

    // Check if ID is provided
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    // Check if the provided ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }

    // Fetch the genre record
    const genre = await db
      .collection('genres')
      .findOne({ _id: new mongoose.Types.ObjectId(id) });

    if (!genre) {
      return NextResponse.json({ error: 'Genre not found' }, { status: 404 });
    }

    // Delete the image file if it exists
    if (genre.imageUrl && !genre.imageUrl.includes('default.jpg')) {
      const imagePath = path.join(
        GENRE_IMAGE_UPLOAD_DIR,
        path.basename(genre.imageUrl)
      );
      try {
        await fs.unlink(imagePath); // Attempt to delete the image file
      } catch (err) {
        return NextResponse.json(
          { error: err },
          { status: 500 }
       
        );
      }
    }

    // Mark the genre as deleted (soft delete)
    const updatedGenre = await db.collection('genres').findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: { isDeleted: true } },
      { returnDocument: 'after' } // This option ensures the updated document is returned
    );

    // Respond with success message
    if (updatedGenre) {
      return NextResponse.json({
        status: 200,
        message: 'Genre marked as deleted successfully',
      });
    }

    return NextResponse.json(
      { error: 'Failed to mark genre as deleted' },
      { status: 500 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}
