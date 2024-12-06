import mongoose from "mongoose";

const MusicSchema = new mongoose.Schema(
  {
    musicDetails: [
      {
        name: {
          type: String,
          required: [true, "music name is required"],
          maxLength: [100, "music name cannot exceed 100 characters"],
          trim: true,
        },
        artistId: {
          type: String,
          required: [true, "artist id  is required"],
        },
        description: {
          type: String,
          maxLength: [500, "description cannot exceed 500 characters"],
          trim: true,
        },
        genreId: {
          type: String,
          required: [true, "genre id is required"],
        },

        languageId: {
          type: String,
          required: [true, "language is required"],
        },
        releaseDate: {
          type: Date,
          required: [true, "release date is required"],
        },
        duration: {
          type: Number,
          required: [true, "Duration is required"],
          min: [0, "Duration must be a positive number"],
        },
      },
    ],
    audioDetails: [
      {
        imgUrl: {
          type: String,
        },
        audioUrl: {
          type: String,
          required: [true, "music url is required"],
        },
      },
    ],
    playTime: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

MusicSchema.index({ email: 1 });
MusicSchema.index({ firstName: 1, lastName: 1 });
MusicSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Music || mongoose.model("Music", MusicSchema);
