import mongoose from 'mongoose';

export interface IGenre {
    _id?: string;
    name?: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
    imageUrl?: string;
    isDeleted?: boolean;
  }
  
export interface ILanguage {
    _id?: string; 
    name?: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
    isDeleted?: boolean;
    imageUrl?: string;
  }
  
export interface Ifilter {
    isDeleted ?: boolean,
    Label ?: string
  }
  
export interface IAlbum {
  _id?: mongoose.Types.ObjectId;             
  name: string;                             
  price?: number;                             
  createdAt?: Date;                          
  updatedAt?: Date;                          
  description: string;                       
  imageUrl: string | null;                  
  Genre: (string | undefined)[];             
  Language: (string | undefined)[];          
  musicIds: mongoose.Types.ObjectId[];    
    
  }
  