import { db } from '@/lib/DbConnection/dbConnection';
import {  NextResponse } from 'next/server'; 

export async function GET() {
  try {
    
    const languageList = await db.collection('languages').find({isDeleted: false}).toArray();
   
  
    if (languageList) {
      return NextResponse.json({
        status: 200,
        data: languageList,
           
      });
    }
  
    return NextResponse.json(
      { error: 'Error while fetching langs' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}
  