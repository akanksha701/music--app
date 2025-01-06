import { NextRequest, NextResponse } from "next/server"; 
import { db } from "../../user/route";

export async function GET(req: NextRequest) {
  try {

    const genreList = await db.collection("genres").find({ isDeleted: false }).toArray();

    console.log("genreList", genreList, genreList.length);
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
