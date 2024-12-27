import Blog from "../models/blogModel.js";
import asyncHandler from "../utils/asyncHandler.js";

const editBlog = asyncHandler(async (req,res,next)=>{
  //here we have the blog id that we want to edit
  const { title, body } = req.body;
  const editedBlog = {
    title,
    body
  }
  if (req.file) editedBlog.coverImageURL = `/uploads/${req.file.filename}`;
  const newblog = await Blog.findByIdAndUpdate(req.params.blogId,editedBlog,{new: true});
  res.status(200).redirect('/');
})

export default editBlog;