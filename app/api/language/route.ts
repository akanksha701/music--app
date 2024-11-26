import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/DbConnection/dbConnection';
import Language from '@/lib/models/Language';

export async function GET(req: NextRequest, res: any) {
  try {
    await dbConnect();
    const languageList = await Language.find({});
    if (languageList) {
      return NextResponse.json({ status: 200, data: languageList });
    }
    return NextResponse.json(
      { error: 'error while fetching languages' },
      { status: 400 }
    );
  } catch (error) {
    console.log(error, 'error');
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
