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
        type: mongoose.Schema.Types.ObjectId,  // Reference to Music model
        ref: "Music",  // Name of the model to reference
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

export default mongoose.models.Album || mongoose.model("Album", albumSchema);
