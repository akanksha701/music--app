const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema(
  {
    musicDetails: {
      name: {
        type: String,
        required: [true, 'music name is required'],
        maxLength: [100, 'music name cannot exceed 100 characters'],
        trim: true,
      },
      artistId: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Artist',
          required: [true, 'at least one artist id is required'],
        },
      ],
      description: {
        type: String,
        maxLength: [500, 'description cannot exceed 500 characters'],
        trim: true,
      },
      genreId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to Genre model
        ref: 'Genre',
        required: [true, 'genre id is required'],
      },
      languageId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to Language model
        ref: 'Language',
        required: [true, 'language is required'],
      },
      releaseDate: {
        type: Date,
        required: [true, 'release date is required'],
      },
      duration: {
        type: String,
        required: [true, 'Duration is required'],
      },
    },
    audioDetails: {
      imageUrl: {
        type: String,
      },
      audioUrl: {
        type: String,
        required: [true, 'music url is required'],
      },
    },
    playCount: {
      type: Number,
      default: 0,
    },
    price: {
      amount: {
        type: Number,
        enum: [0, 10, 20, 30],
        required: true,
      },
      currency: {
        type: String,
        enum: ['USD', 'EUR', 'INR'],
        required: true,
      },
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

export default mongoose.models.Music || mongoose.model('Music', musicSchema);
