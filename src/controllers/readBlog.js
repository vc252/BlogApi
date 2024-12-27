import Blog from "../models/blogModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import Comment from "../models/commentsModel.js";
import User from "../models/userModel.js";

const readBlog = asyncHandler(async(req,res,next)=>{
  //we are adding the info about the creators with the response from the reference available
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({blogId:blog._id}).populate("createdBy");
  res.render('blog',{
    user: req.user,
    blog,
    comments
  });
})

export default readBlog;