import Music from "./Music";

const mongoose = require("mongoose");
const playListSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    musicIds: [
      {
        type: new mongoose.Types.ObjectId(),
        ref: Music,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    imgUrl: {
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

export default mongoose.models.playList ||
  mongoose.model("playList", playListSchema);