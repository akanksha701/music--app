import User from "./User";
import mongoose from 'mongoose';
const { Schema } = mongoose;

const artistSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,  
      ref: 'User',                  
      required: true,
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

export default mongoose.models.Artist || mongoose.model("Artist", artistSchema);
