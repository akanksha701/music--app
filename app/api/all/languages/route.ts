import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/DbConnection/dbConnection";
import Language from "@/lib/models/Language";

export async function GET(req: NextRequest) {
    try {
      await dbConnect();
    
      const languageList = await Language.find({isDeleted: false});
   
  
      if (languageList) {
        return NextResponse.json({
          status: 200,
          data: languageList,
           
        });
      }
  
      return NextResponse.json(
        { error: "Error while fetching langs" },
        { status: 400 }
      );
    } catch (error) {
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
  