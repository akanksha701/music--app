import { NextResponse } from "next/server"
import playlists from "./playlists.json"
export async function GET() {
    try {
       return  NextResponse.json({status:200,topsPlaylists:playlists.topPlayLists})
    } catch (error) {
        console.log('error',error)
    }
}