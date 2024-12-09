import Music from "./Music";
import User from "./User";

const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema(
  {
    userId: {
      ref: User,
      type: new mongoose.Types.ObjectId(),
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Album || mongoose.model("Artist", artistSchema);
