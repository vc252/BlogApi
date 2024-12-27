import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: false
  },
  body: {
    type: String,
    required: true
  },
  coverImageURL: {
    type: String,
    required: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
},{timestamps: true})

blogSchema.index({title: 1,createdBy: 1},{unique: true});

const Blog = mongoose.model('Blog',blogSchema);

export default Blog;