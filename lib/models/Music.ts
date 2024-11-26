import mongoose from 'mongoose';

const MusicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Music name is required'],
      maxLength: [100, 'Music name cannot exceed 100 characters'],
      trim: true,
    },
    description: {
      type: String,
      maxLength: [500, 'Description cannot exceed 500 characters'],
      trim: true,
    },
    coverUrl: {
      type: String,
    },
    categoryId: {
      type: String,
      required: [true, 'Category is required'],

    },
    languageId: {
      type: String,
      required: [true, 'Language is required'],
    },
    artist: {
      type: String,
      required: [true, 'Artist name is required'],
    },
    releaseDate: {
      type: Date,
      required: [true, 'Release date is required'],
    },
    duration: {
      type: Number, // Duration in seconds
      required: [true, 'Duration is required'],
      min: [0, 'Duration must be a positive number'],
    },
    musicUrl: {
      type: String,
      required: [true, 'Music URL is required'],
    },
    playTime: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

MusicSchema.index({ email: 1 });
MusicSchema.index({ firstName: 1, lastName: 1 });
MusicSchema.pre('save',function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Music || mongoose.model('Music', MusicSchema);
