const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timeStamp: true,
  }
);

export default mongoose.models.Language || mongoose.model('Language', languageSchema);
