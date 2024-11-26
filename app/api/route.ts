import connectToDatabase from '@/lib/DbConnection/dbConnection';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDatabase();
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
