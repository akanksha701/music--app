// import { NextResponse } from "next/server";
// import { promises } from "fs";
// import { of, map, from, switchMap, lastValueFrom } from "rxjs";
// import decode from "audio-decode";
// import { Blob as _Blob } from "buffer";
// import path from "path";
// import fs from 'fs';

// // Define the base directory for your audio files (you can adjust this based on your project structure)
// const audioDirectory = path.join(process.cwd(), 'public/audio');

// // Main handler for the API endpoint
// export async function GET(req: any) {
//   try {
//     // Retrieve parameters from the query string
//     const audioFile = req?.nextUrl?.searchParams.get("url");  // Path to the audio file

//     if (!audioFile || !audioFile.endsWith(".mp3")) {
//       return NextResponse.json({ status: 400, message: "Invalid audio URL" });
//     }

//     // Construct the full file path to the audio file
//     let filepath = path.join(audioDirectory, audioFile);
//     console.log("Resolved filepath:", filepath);

//     // Ensure the file exists
//     if (!fs.existsSync(filepath)) {
//       return NextResponse.json({ status: 404, message: "Audio file not found" });
//     }

//     // Get the audio peaks from the file
//     let audioPeaksFromFile$ = getAudioPeaks(filepath);
//     const audioPeaksData = await lastValueFrom(audioPeaksFromFile$);
//     console.log("Audio Peaks Data:", audioPeaksData);

//     // Return the peaks data as JSON response
//     return NextResponse.json({ status: 200, data: audioPeaksData });
//   } catch (err: any) {
//     console.error("Error occurred while processing the audio file:", err);
//     return NextResponse.json({
//       status: 500,
//       message: err.message || "An error occurred while processing the audio file",
//     });
//   }
// }

// // This function processes audio from the file to extract peaks
// const filterData = (audioBuffer: any, blockSize: number) => {
//   const channels = audioBuffer.numberOfChannels;
//   let filteredDataChannels: Array<any> = [];

//   for (let currentchannel = 0; currentchannel < channels; currentchannel++) {
//     const rawData = audioBuffer.getChannelData(currentchannel); // Get the data for the current channel
//     const filteredData: number[] = [];

//     for (let i = 0; i < rawData.length; i += blockSize) {
//       const block = rawData.slice(i, i + blockSize);  // Get a block of data
//       const sum = block.reduce((acc:any, val:number) => acc + Math.abs(val), 0);  // Sum absolute values for the block
//       filteredData.push(sum / block.length);  // Average the block's absolute values to get the peak
//     }

//     filteredDataChannels[currentchannel] = filteredData;
//   }

//   return filteredDataChannels;
// };

// // Normalize the data (this ensures peaks are between 0 and 1)
// const normalizeData = (filteredDataChannels: any[]) => {
//   let normalized: any = [];

//   filteredDataChannels.forEach((channelData, i) => {
//     const max = Math.max(...channelData);
//     const multiplier = max > 0 ? Math.pow(max, -1) : 1;
//     normalized[i] = channelData.map((n: any) => n * multiplier); // Normalize by the maximum value in the channel
//   });

//   return normalized;
// };

// // Function to extract peaks from the audio file (file-based)
// function audioPeaksFromFile(audiofile: string) {
//   return of(audiofile).pipe(
//     switchMap((filepath) => {
//       return from(promises.readFile(filepath)); // Read the audio file
//     }),
//     map((filedata) => new _Blob([filedata.buffer])), // Convert file data into a Blob
//     switchMap((blob) => from(blob.arrayBuffer())), // Convert Blob to ArrayBuffer
//     switchMap((arrayBuffer) => from(decode(arrayBuffer))), // Decode the audio data
//     map((audioBuffer) => filterData(audioBuffer, 2048)), // Process and filter the data in blocks
//     map((filteredData) => normalizeData(filteredData)), // Normalize the data
//     map((normalizedData) => normalizedData[0]) // Get the first channel's peaks
//   );
// }

// // Function to get peaks from URL (optional, if you decide to support URLs)
// function audioPeaksFromURL(audiofileurl: string) {
//   return of(audiofileurl).pipe(
//     switchMap((audiofileurl) => {
//       return from(fetch(audiofileurl)); // Fetch audio from URL
//     }),
//     switchMap((file) => from(file.arrayBuffer())), // Convert the response to ArrayBuffer
//     switchMap((arrayBuffer) => from(decode(arrayBuffer))), // Decode the audio file
//     map((audioBuffer) => filterData(audioBuffer, 2048)), // Filter the data in blocks
//     map((filteredData) => normalizeData(filteredData)), // Normalize
//     map((normalizedData) => normalizedData[0]) // Get first channel's peaks
//   );
// }

// // Main function that decides whether the audio source is from a file or URL
// export function getAudioPeaks(audio: any) {
//   if (audio.startsWith("http")) {
//     return audioPeaksFromURL(audio); // For URL-based audio
//   } else {
//     return audioPeaksFromFile(audio); // For local file-based audio
//   }
// }

import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import decode from "audio-decode";

export const audioDirectory = path.join(process.cwd(), "public");

export async function GET(req: any) {
  try {
    const audioFile = req.nextUrl?.searchParams.get("url");

    if (!audioFile || !audioFile.endsWith(".mp3")) {
      return NextResponse.json({ status: 400, message: "Invalid audio URL" });
    }
    console.log("audioFile", audioFile);
    let filepath = path.join(audioDirectory, audioFile);
    if (!fs.existsSync(filepath)) {
      return NextResponse.json({
        status: 404,
        message: "Audio file not found",
      });
    }

    const audioData = await fs.promises.readFile(filepath);
    const audioBuffer = await decode(audioData);

    const peaks = getPeaksFromAudioBuffer(audioBuffer);
    console.log(peaks.flat());
    return NextResponse.json({ status: 200, data: peaks.flat() });
  } catch (err: any) {
    return NextResponse.json({
      status: 500,
      message: err.message || "Error processing audio",
    });
  }
}

export  const getPeaksFromAudioBuffer = (
  audioBuffer: AudioBuffer,
  blockSize: number = 2048
) => {
  const channels = audioBuffer.numberOfChannels;
  const peakData: number[] = [];

  for (let ch = 0; ch < channels; ch++) {
    const rawData = audioBuffer.getChannelData(ch);
    for (let i = 0; i < rawData.length; i += blockSize) {
      const block = rawData.slice(i, i + blockSize);
      const maxPeak = Math.max(...block.map(Math.abs)); // Find the max peak for this block
      peakData.push(maxPeak);
    }
  }

  return peakData;
};
