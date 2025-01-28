import mongoose from 'mongoose';

const genreRatingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: [true, 'userId is required'],
    },
    genreId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Genre', // Reference to the Music model
      required: [true, 'genreId is required'],
    },
    rating: {
      type: Number,
      required: [true, 'rating is required'],
      min: 1,
      max: 5, 
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


genreRatingSchema.index({ userId: 1, genreId: 1 }, { unique: true });

genreRatingSchema.index({ genreId: 1 });

genreRatingSchema.index({ userId: 1 });

export default mongoose.models.GenreRating || mongoose.model('GenreRating', genreRatingSchema);
