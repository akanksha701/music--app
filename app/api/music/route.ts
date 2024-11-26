import { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/DbConnection/dbConnection';
import Music from '@/lib/models/Music';
export async function POST(req: any, res: NextApiResponse) {
  try {
    await dbConnect();
    const body = await req.json();
    const newMusic = await Music.create({
      name: body?.name,
      description: body?.description,
      categoryId: body?.categoryId,
      languageId: body?.languageId,
      artist: body?.artist,
      releaseDate: new Date(),
      duration: body?.duration,
      coverUrl: body?.coverUrl,
      musicUrl: body?.musicUrl,
    });
    return NextResponse.json({ status: 200, data: newMusic });
  } catch (error) {
    console.log(error, '---');
    return NextResponse.json({ error: error, status: 500 });
  }
}


export async function GET(req: any, res: NextApiResponse) {
  try {
    await dbConnect();
    const musics = await Music.find({}).limit(8);
    return NextResponse.json({ status: 200, data: musics });
  } catch (error) {
    return NextResponse.json({ error: error, status: 500 });
  }
}
