import { NextResponse } from 'next/server';
import PlayList from '@/lib/models/PlayList';
import { db } from '../user/route';
import mongoose from 'mongoose';


export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      const playlist = await db.collection('playlists').findOne({
        _id: new mongoose.Types.ObjectId(id),
      });
      if (!playlist) {
        return NextResponse.json({ message: 'Playlist not found.', status: 404 });
      }
      return NextResponse.json({ data: playlist, status: 200 });
    }

    const playlists = await db.collection('playlists').find().toArray();
    return NextResponse.json({ data: playlists, status: 200 });
  } catch (error) {
    return NextResponse.json({error:error, message: 'Server error. Could not fetch playlists.', status: 500 });
  }
}


export async function POST(req: Request) {
  try {

    const body = await req.json();
    const { user, name } = body;

    if (!user || !name) {
      return NextResponse.json({ message: 'User and name are required.', status: 400 });
    }

    const newPlaylist = new PlayList({ user, 
      name, 
      mode: 'private', 
      createdAt: new Date(), 
      updatedAt: new Date(), 
      isDeleted: false });
    await  db.collection('playlists').insertOne(newPlaylist);

    return NextResponse.json({ message: 'Playlist created successfully.', data: newPlaylist, status: 201 });
  } catch (error) {
    return NextResponse.json({error:error, message: 'Server error. Could not create playlist.', status: 500 });
  }
}

export async function PUT(req: Request) {
  try {

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
    return NextResponse.json({error:error, message: 'Server error. Could not update playlist.', status: 500 });
  }
}

