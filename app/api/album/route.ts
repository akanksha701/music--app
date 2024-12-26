import Album from '@/lib/models/Album';
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/DbConnection/dbConnection';
import { capitalizeTitle, saveFiles } from '@/utils/helpers';
import { ALBUM_IMAGE_UPLOAD_DIR, IMAGE_UPLOAD_DIR } from '../music/route';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const image = (body.image as Blob) || null;
    const { name, description } = body;
    const newAlbum = await Album.create({
      name: await capitalizeTitle(name.toString()),
      description: description,
      imageUrl: image ? await saveFiles(image, ALBUM_IMAGE_UPLOAD_DIR) : null,
    });
    if (newAlbum) {
      return NextResponse.json({
        status: 200,
        message: 'new album created successfully',
        data: newAlbum,
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

export async function GET(req: Request) {
  try {
    await dbConnect();

    const url = new URL(req.url);

    const page: number = parseInt(url.searchParams.get('page') || '1', 10);
    const recordsPerPage: number = parseInt(
      url.searchParams.get('recordsPerPage') || '0',
      10
    );
    if (!recordsPerPage || recordsPerPage) {
      const albumList = await Album.find({});
      return NextResponse.json({
        status: 200,
        data: albumList,
      });
    }

    // Pagination logic if recordsPerPage and page are provided
    const skip = (page - 1) * recordsPerPage;
    const limit = recordsPerPage;

    const albumList = await Album.find({}).skip(skip).limit(limit);

    const totalAlbums = await Album.countDocuments();

    return NextResponse.json({
      status: 200,
      data: albumList,
      pagination: {
        page,
        recordsPerPage,
        totalAlbums,
        totalPages: Math.ceil(totalAlbums / recordsPerPage), // Calculate total pages
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
