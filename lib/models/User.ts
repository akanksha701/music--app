import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type: String,
      required: [true, 'clerk user id is required'],
    },
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      maxLength: [50, 'First name cannot exceed 50 characters'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      maxLength: [50, 'Last name cannot exceed 50 characters'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    imageUrl: {
      type: String,
    },
    isActive: {
      type: Boolean,
      required: [true, 'Active status is required'],
      default: true,
    },
    isDeleted: {
      type: Boolean,
      required: [true, 'Deleted status is required'],
      default: false,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not a valid gender',
      },
    },
    dateOfBirth: {
      type: Date,
    },

    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    
    likedMusics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Music',
      },
    ],
    likedAlbums: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Albums',
      },
    ],
    likedGenres: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
      },
    ],
    playlists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Playlist',
        validate: {
          validator: function (array: any[]) {
            return array.length <= 100;
          },
          message: 'Cannot have more than 100 playlists',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.index({ email: 1 });
userSchema.index({ firstName: 1, lastName: 1 });
userSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.User || mongoose.model('User', userSchema);
