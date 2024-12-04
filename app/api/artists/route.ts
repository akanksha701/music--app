import { NextResponse } from "next/server"
import artists from "./artists.json"
export async function GET() {
    try {
       return  NextResponse.json({status:200,topArtists:artists.topArtists})
    } catch (error) {
        console.log('error',error)
    }
}