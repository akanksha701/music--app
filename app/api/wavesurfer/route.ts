import { NextResponse } from "next/server";
import { promises } from "fs";
import fetch from "node-fetch";
import { of, map, from, switchMap, lastValueFrom } from "rxjs";
import decode from "audio-decode";
import { Blob as _Blob } from "buffer";
import path from "path";

export async function GET(req: any) {
  try {
    const audioUrl = req?.nextUrl?.searchParams.get("url");
    console.log('audioUrl',audioUrl)
    if (!audioUrl || !audioUrl.endsWith(".mp3")) {
      return NextResponse.json({ status: 400, message: "Invalid audio URL" });
    }
    let filepath = path.join(process.cwd(), 'public', audioUrl);
    console.log("Resolved filepath:", filepath);
    let audioPeaksFromFile$ = getAudioPeaks(filepath);
    const audioPeaksData = await lastValueFrom(audioPeaksFromFile$);
    console.log("audioPeaksData", audioPeaksData);

    return NextResponse.json({ status: 200, data: audioPeaksData });
  } catch (err: any) {
    console.error(err, "error======");
    return NextResponse.json({
      status: 500,
      message: err.message || "Error occurred",
    });
  }
}

const filterData = (audioBuffer: any, samples?: any, allchannels?: any) => {
  const channels = allchannels ? audioBuffer.numberOfChannels : 1;
  let filteredDataChannels: Array<any> = [];
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

const normalizeData = (filteredDataChannels: any[]) => {
  let multipliers = [];
  let normalized: any = [];
  filteredDataChannels.map((c: any, i: number) => {
    let multiplier = Math.pow(Math.max(...c), -1);
    normalized[i] = c.map((n: any) => n * multiplier);
  });
  return normalized;
};

function audioPeaksFromFile(audiofile: string, samples?: any) {
  return of(audiofile).pipe(
    switchMap((filepath) => {
      return from(promises.readFile(filepath));
    }),
    map((filedata) => new _Blob([filedata.buffer])),
    switchMap((blob) => from(blob.arrayBuffer())),
    switchMap((arrayBuffer) => from(decode(arrayBuffer))),
    map((audioBuffer) =>
      filterData(audioBuffer, samples ? samples : 70, false)
    ),
    map((filteredData) => normalizeData(filteredData)),
    map((normalizedData) => normalizedData[0])
  );
}

function audioPeaksFromURL(audiofileurl: string, samples?: any) {
  return of(audiofileurl).pipe(
    switchMap((audiofileurl) => {
      return from(fetch(audiofileurl));
    }),
    switchMap((file) => from(file.arrayBuffer())),
    switchMap((arrayBuffer) => from(decode(arrayBuffer))),
    map((audioBuffer) =>
      filterData(audioBuffer, samples ? samples : 70, false)
    ),
    map((filteredData) => normalizeData(filteredData)),
    map((normalizedData) => normalizedData[0])
  );
}

export function getAudioPeaks(audio: any, samples?: any) {
  if (audio.substr(0, 4) == "http") {
    return audioPeaksFromURL(audio, samples);
  } else {
    return audioPeaksFromFile(audio, samples);
  }
}
