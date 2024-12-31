import { NextResponse } from 'next/server';
import dbConnect from "@/lib/DbConnection/dbConnection";
import PlayList from '@/lib/models/PlayList';


export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      const playlist = await PlayList.findById(id);
      if (!playlist) {
        return NextResponse.json({ message: 'Playlist not found.', status: 404 });
      }
      return NextResponse.json({ data: playlist, status: 200 });
    }

    const playlists = await PlayList.find();
    return NextResponse.json({ data: playlists, status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error. Could not fetch playlists.', status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { user, name } = body;

    if (!user || !name) {
      return NextResponse.json({ message: 'User and name are required.', status: 400 });
    }

    const newPlaylist = new PlayList({ user, name });
    await newPlaylist.save();

    return NextResponse.json({ message: 'Playlist created successfully.', data: newPlaylist, status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error. Could not create playlist.', status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect(); // Ensure the database is connected

    const body = await req.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json({ message: 'Playlist ID is required.', status: 400 });
    }

    const updatedPlaylist = await PlayList.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true } // Return the updated document
    );

    if (!updatedPlaylist) {
      return NextResponse.json({ message: 'Playlist not found.', status: 404 });
    }

    return NextResponse.json({ message: 'Playlist updated successfully.', data: updatedPlaylist, status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error. Could not update playlist.', status: 500 });
  }
}

