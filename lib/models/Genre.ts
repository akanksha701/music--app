import mongoose from 'mongoose';


const genreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,  // This adds createdAt and updatedAt fields
  }
);

export default mongoose.models.Genre || mongoose.model('Genre', genreSchema);
