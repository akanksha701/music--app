import mongoose from 'mongoose';

export interface IUserProfile {
    _id: mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    imageUrl: string;
    isActive: boolean;
    isDeleted: boolean;
    gender: 'male' | 'female' | 'other';
    createdAt: Date;
    updatedAt: Date;
    playlists: mongoose.Types.ObjectId[];
    likedMusics: mongoose.Types.ObjectId[];
    likedAlbums: mongoose.Types.ObjectId[];
    likedGenres: mongoose.Types.ObjectId[];
    userId: string;
    dateOfBirth: Date;
  }