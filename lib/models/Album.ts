const mongoose = require("mongoose");

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
        ref: "Music",  
      },
    ],
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: false,
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

export default mongoose.models.Album || mongoose.model("Album", albumSchema);
