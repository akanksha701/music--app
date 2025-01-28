import mongoose from 'mongoose';

const musicRatingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: [true, 'userId is required'],
    },
    musicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Music', // Reference to the Music model
      required: [true, 'musicId is required'],
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


musicRatingSchema.index({ userId: 1, musicId: 1 }, { unique: true });

musicRatingSchema.index({ musicId: 1 });

musicRatingSchema.index({ userId: 1 });

export default mongoose.models.MusicRating || mongoose.model('MusicRating', musicRatingSchema);
