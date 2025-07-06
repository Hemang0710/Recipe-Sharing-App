import mongoose from 'mongoose';

const communitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  image: {
    type: String, // This will store the image URL
    default: null,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [{
    text: String,
    author: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Community || mongoose.model('Community', communitySchema); 