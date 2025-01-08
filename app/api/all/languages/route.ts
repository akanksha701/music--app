import { NextRequest, NextResponse } from 'next/server'; 
import { db } from '../../user/route';

export async function GET(req: NextRequest) {
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
    console.log('error : ' , error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
  