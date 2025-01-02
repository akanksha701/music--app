import { NextResponse } from "next/server";
import dbConnect from "@/lib/DbConnection/dbConnection";
import Music from "@/lib/models/Music";
import { currentUser } from "@clerk/nextjs/server";
import { IMusicProps } from "@/app/(BrowsePage)/Browse/types/types";
import { lastValueFrom, Observable } from "rxjs";
import fs from 'fs';
import path from 'path';
import decode from 'audio-decode'; 

const audioDirectory = path.join(process.cwd(), 'public');

async function decodeAudioFile(filepath: string): Promise<Float32Array[]> {
  const audioData = await fs.promises.readFile(filepath);

  try {
    const decodedAudio = await decode(audioData);
    
    const channelData: Float32Array[] = [];
    for (let i = 0; i < decodedAudio.numberOfChannels; i++) {
      channelData.push(decodedAudio.getChannelData(i)); // Get data for each channel
    }

    return channelData;
  } catch (error) {
    console.error(`Error decoding audio file: ${filepath}`, error);
    throw error;  // Re-throw the error after logging
  }
}


function processAudioPeaks(channelData: Float32Array[], bufferSize: number): number[] {
  const peaks: number[] = [];

  channelData.forEach((data) => {
    const sampleCount = Math.floor(data.length / bufferSize);
    
    for (let i = 0; i < sampleCount; i++) {
      const chunk = data.slice(i * bufferSize, (i + 1) * bufferSize);
      const peak = Math.max(...chunk); 
      peaks.push(peak);
    }
  });

  return peaks;
}
export function getAudioPeaks(filepath: string, bufferSize: number): Observable<number[]> {
  return new Observable((observer) => {
    const fileExtension = path.extname(filepath).toLowerCase();

    if (fileExtension === '.wav' || fileExtension === '.mp3') {
      decodeAudioFile(filepath).then((decodedAudio) => {
        const peaks = processAudioPeaks(decodedAudio, bufferSize);
        observer.next(peaks);
        observer.complete();
      }).catch((err) => {
        observer.error(err);
      });
    } else {
      observer.error(new Error("Unsupported file format"));
    }
  });
}

async function getMusicWithPeaks(musics: IMusicProps[], audioDirectory: string) {
  const musicWithPeaks = await Promise.all(
    musics.map(async (music: IMusicProps) => {
      const audioFileUrl = music.audioUrl;

      if (!audioFileUrl || (!audioFileUrl.endsWith(".mp3") && !audioFileUrl.endsWith(".wav"))) {
        return { ...music, peaks: [] };
      }

      const filepath = path.join(audioDirectory, audioFileUrl);
      if (!fs.existsSync(filepath)) {
        console.error(`File not found at path: ${filepath}`);
        return { ...music, peaks: [] };
      } else {
        try {
          const peaks = await lastValueFrom(getAudioPeaks(filepath, 512));
          return { ...music, peaks }; 
        } catch (error) {
          console.error("Error generating peaks:", error);
          return { ...music, peaks: [] }; 
        }
      }
    })
  );

  return musicWithPeaks;
}

export async function GET() {
  try {
    await dbConnect();
    const user: any = await currentUser();
    
    const musics = await Music.aggregate([
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
              $match: { clerkUserId: user.id },
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
    ]);

    const musicWithPeaks = await getMusicWithPeaks(musics, audioDirectory);
    console.log("musicWithPeaks", musicWithPeaks);

    return NextResponse.json({ status: 200, data: musicWithPeaks });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ status: 500, message: "Error occurred" });
  }
}
