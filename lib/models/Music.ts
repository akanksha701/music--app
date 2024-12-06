import mongoose from "mongoose";
import Genre from "./Genre";
import Language from "./Language";

const musicSchema = new mongoose.Schema(
  {
    musicDetails: {
      type: {
        name: {
          type: String,
          required: [true, "music name is required"],
          maxLength: [100, "music name cannot exceed 100 characters"],
          trim: true,
        },
        artistId: {
          // ref:Artist
          type: new mongoose.Types.ObjectId(),
          required: [true, "artist id  is required"],
        },
        description: {
          type: String,
          maxLength: [500, "description cannot exceed 500 characters"],
          trim: true,
        },
        genreId: {
          ref: Genre,
          type: new mongoose.Types.ObjectId(),
          required: [true, "genre id is required"],
        },

        languageId: {
          ref: Language,
          type: new mongoose.Types.ObjectId(),
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
    },
    audioDetails: {
      type: {
        imgUrl: {
          type: String,
        },
        audioUrl: {
          type: String,
          required: [true, "music url is required"],
        },
      },
    },
    playTime: {
      type: Number,
      default: 0,
    },
    price: {
      type: {
        amount: {
          type: Number,
          enum: [0, 10, 20, 30],
          required: true,
        },
        currency: {
          type: String,
          enum: ["USD", "EUR", "INR"],
          required: true,
        },
      },
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

musicSchema.index({ email: 1 });
musicSchema.index({ firstName: 1, lastName: 1 });
musicSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Music || mongoose.model("Music", musicSchema);
