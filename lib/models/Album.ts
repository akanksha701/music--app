import mongoose from "mongoose";
const albumSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    musicIds: [
      {
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'Music',  
      },
    ],
    description: {
      type: String,
      required: true,
      default : ''
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
    timestamps: true,
  }
);

export default mongoose.models.Album || mongoose.model('Album', albumSchema);
