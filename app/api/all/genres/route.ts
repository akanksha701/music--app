import { NextResponse } from 'next/server'; 
import { db } from '../../user/route';

export async function GET() {
  try {

    const genreList = await db.collection('genres').find({ isDeleted: false }).toArray();

    if (genreList) {
      return NextResponse.json({
        status: 200,
        data: genreList,

      });
    }

    return NextResponse.json(
      { error: 'Error while fetching genres' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 }
   
    );
  }
}
