import { NextResponse } from 'next/server';
import dbConnect from '@/lib/DbConnection/dbConnection';
import Music from '@/lib/models/Music';
import { currentUser } from '@clerk/nextjs/server';
import path from 'path';
import fs from 'fs';
import { audioPeaksFromFile } from '../wavesurfer/route';
import { IMusicProps } from '@/app/(BrowsePage)/Browse/types/types';
import { lastValueFrom } from 'rxjs';



export const getFormattedDurationStage = () => {
  return {
    $addFields: {
      formattedDuration: {
        $concat: [
          // Calculate Hours
          {
            $toString: {
              $floor: {
                $divide: ['$musicDetails.duration', 3600], // 3600 seconds = 1 hour
              },
            },
          },
          ':',
          // Calculate Minutes
          {
            $toString: {
              $cond: {
                if: {
                  $gte: [
                    {
                      $floor: {
                        $divide: [
                          { $mod: ['$musicDetails.duration', 3600] }, // Remaining seconds after removing hours
                          60, // Minutes in remaining time
                        ],
                      },
                    },
                    10,
                  ],
                },
                then: {
                  $toString: {
                    $floor: {
                      $divide: [
                        { $mod: ['$musicDetails.duration', 3600] }, // Remaining seconds after removing hours
                        60, // Minutes in remaining time
                      ],
                    },
                  },
                },
                else: {
                  $concat: [
                    '0', // Add leading zero for single digit minutes
                    {
                      $toString: {
                        $floor: {
                          $divide: [
                            { $mod: ['$musicDetails.duration', 3600] }, // Remaining seconds after removing hours
                            60, // Minutes in remaining time
                          ],
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
          ':',
          // Calculate Seconds (without fractional part)
          {
            $toString: {
              $cond: {
                if: {
                  $gte: [
                    {
                      $mod: ['$musicDetails.duration', 60], // Remaining seconds after removing minutes
                    },
                    10,
                  ],
                },
                then: {
                  $toString: {
                    $floor: {
                      // Round to the nearest second
                      $mod: ['$musicDetails.duration', 60], // Get remaining whole seconds
                    },
                  },
                },
                else: {
                  $concat: [
                    '0', // Add leading zero for single digit seconds
                    {
                      $toString: {
                        $floor: {
                          // Round to the nearest second
                          $mod: ['$musicDetails.duration', 60], // Get remaining whole seconds
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        ],
      },
    },
  };
};



export async function GET() {
  try {
    await dbConnect();
    const user: any = await currentUser();
    const musics = await Music.aggregate([
      {
        $lookup: {
          from: 'artists',
          let: { artistsIds: '$musicDetails.artistId' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ['$_id', '$$artistsIds'],
                },
              },
            },
          ],
          as: 'artistDetails',
        },
      },
      {
        $lookup: {
          from: 'users',
          let: { artistsIds: '$artistDetails.userId' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ['$_id', '$$artistsIds'],
                },
              },
            },
          ],
          as: 'artists',
        },
      },
      {
        $lookup: {
          from: 'users',
          pipeline: [
            {
              $match: { clerkUserId: user.id },
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
          liked: { $in: ['$_id', '$loggedInUser.likedMusics'] },
        },
      },
      {
        $unwind: {
          path: '$artists',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$musicDetails.name' },
          description: { $first: '$musicDetails.description' },
          duration: { $first: '$musicDetails.duration' },
          artists: {
            $push: {
              $concat: ['$artists.firstName', ' ', '$artists.lastName'],
            },
          },
          liked: { $first: '$liked' },
          email: { $first: '$artists.email' },
          price: { $first: '$price.amount' },
          currency: { $first: '$price.currency' },
          imageUrl: { $first: '$audioDetails.imageUrl' },
          audioUrl: { $first: '$audioDetails.audioUrl' },
          playCount: { $first: '$playCount' },
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
      {
        $sort: {
          playCount: -1,
          _id: 1,
        },
      },
    ]);

    const musicWithPeaks = await Promise.all(
      musics.map(async (music: IMusicProps, index: number) => {
        const audioFileUrl = music.audioUrl;

        if (!audioFileUrl || !audioFileUrl.endsWith('.mp3')) {
          return { ...music, peaks: [] };
        }

        const audioDirectory = path.join(process.cwd(), 'public');
        const filepath = path.join(audioDirectory, audioFileUrl);

        if (!fs.existsSync(filepath)) {
          console.error(`File not found at path: ${filepath}`);
          return { ...music, peaks: [] };
        }

        try {
          const audioPeaksObservable = audioPeaksFromFile(filepath, 70);
          const peaks = await lastValueFrom(audioPeaksObservable);
          return { ...music, peaks: peaks };
        } catch (err) {
          console.error('Failed to read or decode audio data:', err);
          return { ...music, peaks: [] };
        }
      })
    );

    return NextResponse.json({ status: 200, data: musicWithPeaks });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ status: 500, message: 'Error occurred' });
  }
}
