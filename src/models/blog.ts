import mongoose from 'mongoose';
import { IBlog } from '../interfaces/IBlog';

const { Schema } = mongoose;

const BlogSchema = new Schema({
  title: {
    type: String,
    unique: true,
  },

  description: {
    type: String,
  },

  content: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },

  created_at: Date,
  updated_at: Date,
}).index({ title: 1 });

const Blog = mongoose.model<IBlog & mongoose.Document>('Blog', BlogSchema);

export default Blog;
