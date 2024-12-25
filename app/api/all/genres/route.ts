import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/DbConnection/dbConnection";
import Genre from "@/lib/models/Genre";

export async function GET(req: NextRequest) {
    try {
      await dbConnect();
    
      const genreList = await Genre.find({isDeleted: false});
   
  console.log("genreList" , genreList, genreList.length);
      if (genreList) {
        return NextResponse.json({
          status: 200,
          data: genreList,
           
        });
      }
  
      return NextResponse.json(
        { error: "Error while fetching genres" },
        { status: 400 }
      );
    } catch (error) {
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
  