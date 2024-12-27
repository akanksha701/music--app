const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema(
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Language ||
  mongoose.model('Language', languageSchema);
