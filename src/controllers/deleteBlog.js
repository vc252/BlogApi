import Blog from "../models/blogModel.js";
import asyncHandler from "../utils/asyncHandler.js";

const deleteBlog = asyncHandler(async (req,res,next)=>{
  if (!req.user) {
    return res.redirect('/');
  }
  // console.log('hello');
  await Blog.findByIdAndDelete(req.params.blogId);
  res.status(200).send('blog deleted')
})

export default deleteBlog;