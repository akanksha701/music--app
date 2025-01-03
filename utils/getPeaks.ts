import { of, map, from, switchMap, lastValueFrom, Observable } from "rxjs";
import decode from "audio-decode";
import { Blob as _Blob } from "buffer";
import path from "path";
import fs from "fs";
import { IMusicProps } from "@/app/(BrowsePage)/Browse/types/types";

export const audioDirectory = path.join(process.cwd(), "public");

export async function decodeAudioFile(
  filepath: string
): Promise<Float32Array[]> {
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
    throw error; // Re-throw the error after logging
  }
}

export function processAudioPeaks(
  channelData: Float32Array[],
  bufferSize: number
): number[] {
  const peaks: number[] = [];

  channelData.forEach((data) => {
    const sampleCount = Math.floor(data.length / bufferSize);

    for (let i = 0; i < sampleCount; i++) {
      const chunk = data.slice(i * bufferSize, (i + 1) * bufferSize);
      const peak = Math.max(...chunk);
      peaks.push(peak);
    }
  });
  const min = Math.min(...peaks);
  const max = Math.max(...peaks);
  return peaks.map((peak) => (peak - min) / (max - min));
}

export function getAudioPeaks(
  filepath: string,
  bufferSize: number
): Observable<number[]> {
  return new Observable((observer) => {
    const fileExtension = path.extname(filepath).toLowerCase();

    if (fileExtension === ".wav" || fileExtension === ".mp3") {
      decodeAudioFile(filepath)
        .then((decodedAudio) => {
          const peaks = processAudioPeaks(decodedAudio, bufferSize);
          observer.next(peaks);
          observer.complete();
        })
        .catch((err) => {
          observer.error(err);
        });
    } else {
      observer.error(new Error("Unsupported file format"));
    }
  });
}

export async function getMusicWithPeaks(
  musics: IMusicProps[],
  audioDirectory: string
) {
  const musicWithPeaks = await Promise.all(
    musics.map(async (music: IMusicProps) => {
      const audioFileUrl = music.audioUrl;

      if (
        !audioFileUrl ||
        (!audioFileUrl.endsWith(".mp3") && !audioFileUrl.endsWith(".wav"))
      ) {
        return { ...music, peaks: [] };
      }

      const filepath = await path.join(audioDirectory, audioFileUrl);
      if (!fs.existsSync(filepath)) {
        console.error(`File not found at path: ${filepath}`);
        return { ...music, peaks: [] };
      } else {
        try {
          const peaks = await lastValueFrom(await getAudioPeaks(filepath, 512));
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
