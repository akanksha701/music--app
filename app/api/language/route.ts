import { NextRequest, NextResponse } from 'next/server';
import { capitalizeTitle, saveFiles } from '@/utils/helpers';
import { LANGUAGE_IMAGE_UPLOAD_DIR } from '../music/route';
import path from 'path';
import fs from 'fs/promises';
import { NextApiRequest } from 'next';
import { db } from '../user/route';
import mongoose from 'mongoose';
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const page = parseInt(url.searchParams.get('page') || '1', 10); 
    const recordsPerPage = parseInt(
      url.searchParams.get('recordsPerPage') || '0',
      10
    );
    if (!recordsPerPage || !page) {
      const languageList = await db.collection('languages').find({isDeleted : false}).toArray();
      console.log('lan',languageList)
      return NextResponse.json({
        status: 200,
        data: languageList,
      });
    }
    const skip = (page - 1) * recordsPerPage;
    const limit = recordsPerPage;
    const languageList = await db
      .collection('languages')
      .find({})
      .skip(skip)
      .limit(limit).toArray();
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
      { error: error },
      { status: 500 }
   
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const { name, description } = body;
    const image = body.image || null;
    const imageUrl = image && image !== 'undefined'
      ? await saveFiles(image as Blob, LANGUAGE_IMAGE_UPLOAD_DIR)
      : '/languages/images/default.jpg'; 
    const newLanguage = await db.collection('languages').insertOne({
      name: await capitalizeTitle(name.toString()),
      description: description,
      imageUrl: imageUrl,
      isDeleted  : false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    if (newLanguage) {
      return NextResponse.json({
        status: 200,
        message: 'New language created successfully',
        data: newLanguage,
      });
    }
    return NextResponse.json(
      { error: 'Error while creating language' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error:error },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const url = new URL(req.url as string);
    const id = url.searchParams.get('id');
    if (!id) throw new Error('ID cannot be null');
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const img = body.img || null;
    const { name, description } = body;
    const existingLanguage = await db.collection('languages').findOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    if (!existingLanguage) {
      return NextResponse.json({ error: 'Language not found' }, { status: 404 });
    }
    let imageUrl = existingLanguage.imageUrl;
    if (img instanceof Blob) {
      if (existingLanguage.imageUrl) {
        const oldFilePath = path.join(LANGUAGE_IMAGE_UPLOAD_DIR, path.basename(existingLanguage.imageUrl));
        const isFileReferenced = await db.collection('languages').findOne({
          imageUrl: existingLanguage.imageUrl,
          _id: { $ne: new mongoose.Types.ObjectId(id) },
        });
        if (!isFileReferenced) {
          try {
            await fs.unlink(oldFilePath);
          } catch (err) {
            return NextResponse.json(
              { error: err },
              { status: 500 }
            );
          }
        }
      }
      imageUrl = await saveFiles(img, LANGUAGE_IMAGE_UPLOAD_DIR);
    }
    const updatedLanguage = await db.collection('languages').findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      {
        $set: {
          name,
          description,
          imageUrl: imageUrl === 'undefined' ? '/languages/images/default.jpg' : imageUrl,
        },
      },
      { returnDocument: 'after' }
    );
    if (updatedLanguage) {
      return NextResponse.json({
        status: 200,
        data: updatedLanguage,
      });
    }
    return NextResponse.json({ error: 'Language not updated' }, { status: 500 });
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextApiRequest) {
  try {
    const url = new URL(req.url as string);
    const id = url.searchParams.get('id');
    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid ID format' },
        { status: 400 }
      );
    }
    const existingLanguage = await db.collection('languages').findOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    if (!existingLanguage) {
      return NextResponse.json(
        { error: 'Language not found' },
        { status: 404 }
      );
    }
    if (existingLanguage.imageUrl && !existingLanguage.imageUrl.includes('default.jpg')) {
      const imagePath = path.join(process.cwd(), 'public', existingLanguage.imageUrl); 
      try {
        await fs.unlink(imagePath); 
      } catch (error) {
        return NextResponse.json(
          { error: error },
          { status: 500 }
       
        );
      }
    }
    const updatedLanguage = await db.collection('languages').findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: { isDeleted: true } }, 
      { returnDocument: 'after' } 
    );

    if (!updatedLanguage?.value) {
      return NextResponse.json(
        { error: 'Failed to mark as deleted' },
        { status: 500 }
      );
    }
    return NextResponse.json({
      status: 200,
      message: 'Language marked as deleted successfully',
      data: updatedLanguage.value,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}