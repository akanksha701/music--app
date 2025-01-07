
import { v2 as cloudinary } from 'cloudinary';
import { getDb } from '@/lib/DbConnection/dbConnection';
import { User } from 'firebase/auth';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const db = await getDb();


