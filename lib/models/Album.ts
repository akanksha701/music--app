import mongoose from 'mongoose';
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
      default: ''
    },
    imageUrl: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },


    Label: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    Rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    Price: {
      type: Number,
      default: 0,
    },
    ShareCount: {
      type: Number,
      default: 0,
    },
    Genre: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Genre',
    }],
    Language: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Language',
    }],
    
  },

  {
    timestamps: true,
  }
);

export default mongoose.models.Album || mongoose.model('Album', albumSchema);
