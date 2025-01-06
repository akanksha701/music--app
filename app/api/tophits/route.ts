import { NextRequest, NextResponse } from 'next/server'; 
import Music from '@/lib/models/Music';
import { currentUser } from '@clerk/nextjs/server';
import path from 'path';
import fs from 'fs'; 
import { IMusicProps } from '@/app/(BrowsePage)/Browse/types/types';
import { lastValueFrom } from 'rxjs';
import { db } from '../user/route';
import { audioDirectory, getMusicWithPeaks } from '@/utils/getPeaks';



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



export async function GET(req: NextRequest) {
  try { 
    const queryParams = req.nextUrl.searchParams;
    const UserId = queryParams.get('id'); // Replace with your parameter key 
    const user: any = await currentUser();
    const musics = await db
      .collection("musics")
      .aggregate([
        {
          $lookup: {
            from: "artists",
            let: { artistsIds: "$musicDetails.artistId" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ["$_id", "$$artistsIds"],
                  },
                },
              },
            ],
            as: "artistDetails",
          },
        },
        {
          $lookup: {
            from: "users",
            let: { artistsIds: "$artistDetails.userId" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $in: ["$_id", "$$artistsIds"],
                  },
                },
              },
            ],
            as: "artists",
          },
        },
        {
          $lookup: {
            from: "users",
            pipeline: [
              {
                $match: { clerkUserId: user?.id || UserId },
              },
              {
                $project: { likedMusics: 1 },
              },
            ],
            as: "loggedInUser",
          },
        },
        {
          $unwind: {
            path: "$loggedInUser",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            liked: { $in: ["$_id", "$loggedInUser.likedMusics"] },
          },
        },
        {
          $unwind: {
            path: "$artists",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: "$_id",
            name: { $first: "$musicDetails.name" },
            description: { $first: "$musicDetails.description" },
            duration: { $first: "$musicDetails.duration" },
            artists: {
              $push: {
                $concat: ["$artists.firstName", " ", "$artists.lastName"],
              },
            },
            liked: { $first: "$liked" },
            email: { $first: "$artists.email" },
            price: { $first: "$price.amount" },
            currency: { $first: "$price.currency" },
            imageUrl: { $first: "$audioDetails.imageUrl" },
            audioUrl: { $first: "$audioDetails.audioUrl" },
            playCount: { $first: "$playCount" },
          },
        },
        {
          $addFields: {
            artists: {
              $reduce: {
                input: "$artists",
                initialValue: "",
                in: {
                  $cond: {
                    if: { $eq: ["$$value", ""] },
                    then: "$$this",
                    else: { $concat: ["$$value", ", ", "$$this"] },
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
      ])
      .toArray();

      const musicWithPeaks = await getMusicWithPeaks(musics, audioDirectory);
      return NextResponse.json({ status: 200, data: musicWithPeaks });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ status: 500, message: "Error occurred" });
  }
}
