// PlayList : 
// USER *(Object Id)
// Name *
// Description 
// Cover Image 
// Songs *2 
// Artists ([])
// Genres ([])
// Languages ([])
// Mode(Public/Private)
import mongoose  from 'mongoose'; 
 
const playlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId ,
      ref: 'User', // Assuming you have a User model
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    coverImage: {
      type: String, // URL or file path for the image
    },
    songs: [
      {
        type: mongoose.Schema.Types.ObjectId , 
        ref: 'Music', // Assuming you have a Song model 
      }
    ],
    artists: [
      {
        type: String, // Can be an array of artist names or IDs depending on your structure
      }
    ],
    genres: [
      {
        type: String, // Genre name
      }
    ],
    languages: [
      {
        type: String, // Language of the song(s)
      }
    ],
    mode: {
      type: String,
      enum: ['Public', 'Private'],
      default: 'Private',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields automatically
);
 
 
export default mongoose.models.Playlist || mongoose.model('Playlist', playlistSchema);
