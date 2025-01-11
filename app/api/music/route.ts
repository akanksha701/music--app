import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { capitalizeTitle, getAudioDuration, saveFiles } from '@/utils/helpers';
import mongoose, { PipelineStage } from 'mongoose';
import { db } from '../user/route';
import { getMusicWithPeaks } from '@/utils/getPeaks';
import { auth } from '@/lib/firebase/firebaseAdmin/auth';
import { IMusicFormData } from './types/types';

export const config = {
  api: {
    bodyParser: false,
  },
};

export const LANGUAGE_IMAGE_UPLOAD_DIR = path.resolve(
  'public/languages/images'
);
export const IMAGE_UPLOAD_DIR = path.resolve('public/music/images');
export const AUDIO_UPLOAD_DIR = path.resolve('public/music/audio');
export const ALBUM_IMAGE_UPLOAD_DIR = path.resolve('public/albums/images');
export const GENRE_IMAGE_UPLOAD_DIR = path.resolve('public/genres/images');

async function getAudioDetails(body:IMusicFormData) {
  const audio = (body.audio as Blob) || null;
  const image = (body.image as Blob) || null;
  const audioUrl = audio ? await saveFiles(audio, AUDIO_UPLOAD_DIR) : null;
  const peaks = await getMusicWithPeaks(audioUrl as string);
  const audioDetails = {
    imageUrl: image ? await saveFiles(image, IMAGE_UPLOAD_DIR) : null,
    audioUrl: audio ? await saveFiles(audio, AUDIO_UPLOAD_DIR) : null,
    peaks: peaks || [],
  };
  return audioDetails;
}
async function getMusicPrimaryDetails(body:IMusicFormData) {
  const audio = (body.audio as Blob) || null;
  const artistIds = body.artists
    ? body.artists
      .toString()
      .split(',')
      .map((id: string) => new mongoose.Types.ObjectId(id))
    : [];
  console.log('artistIds',artistIds)

  const musicDetails = {
    name: await capitalizeTitle(body?.name.toString()),
    description: body.description,
    genreId: body.genre,
    languageId: body.language,
    artistId: artistIds,
    releaseDate: new Date(),
    duration: (await getAudioDuration(audio)) || 0,
  };
  return musicDetails;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const body:any = Object.fromEntries(formData);
    const albumIds = Array.isArray(body?.album) ? body?.album : [body?.album];
    const musicDetails = await getMusicPrimaryDetails(body);
    const audioDetails = await getAudioDetails(body);
    const price = {
      amount: Number(body.priceAmount || 0),
      currency: body.currency || 'USD',
    };
    if (body.album) {
      const newMusic = await db.collection('musics').insertOne({
        musicDetails: musicDetails,
        audioDetails: audioDetails,
        playCount: 0,
        price: price,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const updatedAlbum = await db
        .collection('albums')
        .updateMany(
          { _id: { $in: albumIds } },
          { $addToSet: { musicIds: newMusic.insertedId } }
        );

      if (!updatedAlbum) {
        return NextResponse.json({
          status: 500,
          message: 'An error occurred while creating new music.',
        });
      }
      return NextResponse.json({
        status: 200,
        message: 'New music created successfully',
        data: newMusic,
      });
    } else {
      return NextResponse.json({
        status: 400,
        message: 'Album ID is required',
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: 'An error occurred while creating new music.',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req?.url as string);
    const page = await url?.searchParams?.get('page');
    const recordsPerPage = await url?.searchParams?.get('recordsPerPage');
    const language: string | null =
      (await url?.searchParams?.get('language')) || null;

    let currentPage = 1;
    let limit = 0;

    if (page && recordsPerPage) {
      currentPage = parseInt(page, 10);
      limit = parseInt(recordsPerPage, 10);
    }

    const skip = (currentPage - 1) * limit;

    const totalRecords = await await db.collection('musics').countDocuments();
    const authHeader: string | null = req.headers.get('Authorization');
    const token = authHeader?.split(' ')[1];
    const decodedToken = await auth.verifyIdToken(token as string);
    const user = await auth.getUser(decodedToken.uid);
    const aggregatePipeline: PipelineStage[] = [
      {
        $lookup: {
          from: 'artists',
          localField: 'musicDetails.artistId',
          foreignField: 'userId',
          as: 'artistDetails',
        },
      },
      {
        $lookup: {
          from: 'languages',
          localField: 'musicDetails.languageId',
          foreignField: '_id',
          as: 'languageDetails',
        },
      },
      {
        $unwind: {
          path: '$artistDetails',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$languageDetails',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'artistDetails.userId',
          foreignField: '_id',
          as: 'artists',
        },
      },
      {
        $unwind: {
          path: '$artists',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: 'users',
          pipeline: [
            {
              $match: { userId: user?.uid },
            },
            {
              $project: { likedMusics: 1 },
            },
          ],
          as: 'loggedInUser',
        },
      },
      {
        $unwind: {
          path: '$loggedInUser',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          fullArtistName: {
            $concat: [
              { $ifNull: ['$artists.firstName', ''] },
              ' ',
              { $ifNull: ['$artists.lastName', ''] },
            ],
          },
          liked: {
            $in: ['$_id', { $ifNull: ['$loggedInUser.likedMusics', []] }],
          },
        },
      },
    ];

    if (language) {
      await aggregatePipeline.push({
        $match: {
          'languageDetails.name': await language,
        },
      });
    }

    await aggregatePipeline.push(
      {
        $group: {
          _id: '$_id',
          name: { $first: '$musicDetails.name' },
          language: { $first: '$languageDetails.name' },
          duration: { $first: '$musicDetails.duration' },
          description: { $first: '$musicDetails.description' },
          artists: {
            $push: '$fullArtistName',
          },
          liked: { $first: '$liked' },
          email: { $first: '$artists.email' },
          price: { $first: '$price.amount' },
          currency: { $first: '$price.currency' },
          imageUrl: { $first: '$audioDetails.imageUrl' },
          audioUrl: { $first: '$audioDetails.audioUrl' },
          peaks: { $first: '$audioDetails.peaks' },
          createdAt: { $first: '$createdAt' },
        },
      },
      {
        $addFields: {
          artists: {
            $reduce: {
              input: '$artists',
              initialValue: '',
              in: {
                $cond: {
                  if: { $eq: ['$$value', ''] },
                  then: '$$this',
                  else: { $concat: ['$$value', ', ', '$$this'] },
                },
              },
            },
          },
        },
      },
      { $sort: { createdAt: -1, _id: 1 } }
    );

    if (limit > 0) {
      aggregatePipeline.push({ $skip: skip }, { $limit: limit });
    }

    const musics = await db
      .collection('musics')
      .aggregate(aggregatePipeline)
      .toArray();

    const totalPages = limit > 0 ? Math.ceil(totalRecords / limit) : 1;

    return NextResponse.json({
      status: 200,
      data: {
        data: musics,
        pagination:
          limit > 0
            ? {
              currentPage,
              totalPages,
              totalRecords,
              recordsPerPage: limit,
            }
            : undefined,
      },
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: error,
      message: 'Error occurred',
    });
  }
}
