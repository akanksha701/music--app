import { NextResponse } from "next/server";
import peakbuilder from "wavesurfer-peakbuilder";

export async function GET() {
  try {
    const peaks = await peakbuilder("http://localhost:3000/music/audio/random-thoughts-20586.mp3");
    console.log(peaks);
    return NextResponse.json({ status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ status: 500, message: 'Error occurred' });
  }
}
