import { NextResponse } from "next/server";
import { promises } from "fs";
import { of, map, from, switchMap, lastValueFrom } from "rxjs";
import decode from "audio-decode";
import { Blob as _Blob } from "buffer";
import path from "path";
import fs from 'fs';

export const audioDirectory = path.join(process.cwd(), 'public/audio');

// Helper function to handle the samples value
export const getSamples = (samples: any) => samples ? samples : 70;

export async function GET(req: any) {
  try {
    // Retrieve parameters from the query string
    const audioFile = req?.nextUrl?.searchParams.get("url");  // Path to the audio file
    const samples = parseInt(req?.nextUrl?.searchParams.get("samples") || "70", 10);  // Default to 70 if not provided

    if (!audioFile || !audioFile.endsWith(".mp3")) {
      return NextResponse.json({ status: 400, message: "Invalid audio URL" });
    }

    // Construct the full file path to the audio file
    const filepath = path.join(audioDirectory, audioFile);
    console.log("Resolved filepath:", filepath);

    // Ensure the file exists
    try {
      await promises.access(filepath);
    } catch (error) {
      return NextResponse.json({ status: 404, message: "Audio file not found" });
    }

    // Get the audio peaks from the file
    let audioPeaksFromFile$ = getAudioPeaks(filepath, samples);
    const audioPeaksData = await lastValueFrom(audioPeaksFromFile$);
    console.log("Audio Peaks Data:", audioPeaksData);

    // Return the peaks data as JSON response
    return NextResponse.json({ status: 200, data: audioPeaksData });
  } catch (err: any) {
    console.error("Error occurred while processing the audio file:", err);
    return NextResponse.json({
      status: 500,
      message: err.message || "An error occurred while processing the audio file",
    });
  }
}

export const filterData = (audioBuffer: any, samples: any, allchannels: boolean) => {
  const channels = allchannels ? audioBuffer.numberOfChannels : 1;
  let filteredDataChannels = [];
  let currentchannel = 0;
  for (currentchannel = 0; currentchannel < channels; currentchannel++) {
    const rawData = audioBuffer.getChannelData(currentchannel); // We only need to work with one channel of data
    const blockSize = Math.floor(rawData.length / samples); // the number of samples in each subdivision
    const filteredData = [];
    for (let i = 0; i < samples; i++) {
      let blockStart = blockSize * i; // the location of the first sample in the block
      let sum = 0;
      for (let j = 0; j < blockSize; j++) {
        sum = sum + Math.abs(rawData[blockStart + j]); // find the sum of all the samples in the block
      }
      filteredData.push(sum / blockSize); // divide the sum by the block size to get the average
    }
    filteredDataChannels[currentchannel] = filteredData;
  }
  return filteredDataChannels;
};

// Normalize the data (this ensures peaks are between 0 and 1)
export const normalizeData = (filteredDataChannels: any[]) => {
  let normalized: any = [];

  filteredDataChannels.forEach((channelData, i) => {
    const max = Math.max(...channelData);
    const multiplier = max > 0 ? Math.pow(max, -1) : 1;
    normalized[i] = channelData.map((n: any) => n * multiplier); // Normalize by the maximum value in the channel
  });

  return normalized;
};

export function audioPeaksFromFile(audiofile: string, samples: any) {
  return of(audiofile).pipe(
    switchMap((filepath) => {
      return from(promises.readFile(filepath)); // Read the audio file
    }),
    map((filedata) => new _Blob([filedata.buffer])), // Convert file data into a Blob
    switchMap((blob) => from(blob.arrayBuffer())), // Convert Blob to ArrayBuffer
    switchMap((arrayBuffer) => from(decode(arrayBuffer))), // Decode the audio data
    map((audioBuffer) => filterData(audioBuffer, getSamples(samples), false)), // Apply filtering with samples
    map((filteredData) => normalizeData(filteredData)), // Normalize the data
    map((normalizedData) => normalizedData[0]) // Get the first channel's peaks
  );
}

export function audioPeaksFromURL(audiofileurl: string, samples: any) {
  return of(audiofileurl).pipe(
    switchMap((audiofileurl) => {
      return from(fetch(audiofileurl)); // Fetch audio from URL
    }),
    switchMap((file) => from(file.arrayBuffer())), // Convert the response to ArrayBuffer
    switchMap((arrayBuffer) => from(decode(arrayBuffer))), // Decode the audio file
    map((audioBuffer) => filterData(audioBuffer, getSamples(samples), false)), // Filter the data in blocks
    map((filteredData) => normalizeData(filteredData)), // Normalize
    map((normalizedData) => normalizedData[0]) // Get first channel's peaks
  );
}

export function getAudioPeaks(audio: any, samples: any) {
  if (audio.startsWith("http")) {
    return audioPeaksFromURL(audio, samples); // For URL-based audio
  } else {
    return audioPeaksFromFile(audio, samples); // For local file-based audio
  }
}
