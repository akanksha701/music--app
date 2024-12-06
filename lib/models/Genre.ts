const mongoose = require("mongoose");

const GenreSchema = new mongoose.Schema(
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
    imgUrl: {
      type: String,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,  // This adds createdAt and updatedAt fields
  }
);

export default mongoose.models.Genre || mongoose.model("Genre", GenreSchema);
