import mongoose from 'mongoose';

const albumRatingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: [true, 'userId is required'],
    },
    albumId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Genre', // Reference to the Music model
      required: [true, 'albumId is required'],
    },
    rating: {
      type: Number,
      required: [true, 'rating is required'],
      min: 1,
      max: 5, // Assuming ratings are between 1 and 5
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);


albumRatingSchema.index({ userId: 1, albumId: 1 }, { unique: true });

albumRatingSchema.index({ albumId: 1 });

albumRatingSchema.index({ userId: 1 });

export default mongoose.models.AlbumRating || mongoose.model('AlbumRating', albumRatingSchema);
