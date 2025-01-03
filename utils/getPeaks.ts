import decode from "audio-decode";
import path from "path";
import fs from "fs";
import { IMusicProps } from "@/app/(BrowsePage)/Browse/types/types";

export const audioDirectory = path.join(process.cwd(), "public");


export async function decodeAudio(filepath: string): Promise<any> {
  try {
    // Fetch the audio file as an ArrayBuffer
    const response = await fetch(
      "http://localhost:3000/music/audio/cinematic-designed-sci-fi-whoosh-transition-nexawave-228295.mp3"
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch audio file: ${response.statusText}`);
    }

    // Convert the response to an ArrayBuffer (binary format)
    const audioData = await response.arrayBuffer();

    // Now decode the audio from the ArrayBuffer
    const decodedAudio = await decode(audioData); // Assuming your decode function works with ArrayBuffer

    return decodedAudio;
  } catch (error) {
    console.error("Error decoding audio:", error);
    throw new Error(`Cannot decode the audio file at ${filepath}`);
  }
}

// Decode the ArrayBuffer to audio data
export async function audioDecode(audioData: ArrayBuffer) {
  try {
    const decodedAudio = await decode(audioData); // Replace with your actual decoding logic
    return decodedAudio;
  } catch (error) {
    console.error("Error in decoding:", error);
    throw new Error("Audio decoding failed.");
  }
}

// Process the audio peaks
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

export async function getAudioPeaks(
  filepath: string,
  bufferSize: number
): Promise<number[]> {
  try {
    const response = await fetch(
      `http://localhost:3000${filepath.split("public")[1]}`
    );
    console.log("Fetching audio file:", filepath);
    if (!response.ok) {
      throw new Error(`Failed to fetch audio file: ${response.statusText}`);
    }

    const audioData = await response.arrayBuffer();
    console.log("Audio file fetched, decoding...");

    const decodedAudio = await decode(audioData);

    const channelData: any[] = [];
    for (let i = 0; i < decodedAudio.numberOfChannels; i++) {
      channelData.push(decodedAudio.getChannelData(i)); // Get data for each channel
    }

    console.log("Audio decoded successfully, processing peaks...");
    return processAudioPeaks(channelData, bufferSize); // Generate and return the peaks
  } catch (error) {
    console.error("Error generating peaks:", error);
    throw new Error(`Cannot decode the audio file at ${filepath}`);
  }
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

      const filepath = path.join(audioDirectory, audioFileUrl);

      // If running server-side, use fs to check file existence
      if (typeof window === "undefined") {
        if (!fs.existsSync(filepath)) {
          console.error(`File not found at path: ${filepath}`);
          return { ...music, peaks: [] };
        }
      }

      try {
        const peaks = await getAudioPeaks(filepath, 512);
        return { ...music, peaks };
      } catch (error) {
        console.error("Error generating peaks:", error);
        return { ...music, peaks: [] };
      }
    })
  );

  return musicWithPeaks;
}
