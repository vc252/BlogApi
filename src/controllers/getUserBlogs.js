import Blog from "../models/blogModel.js";
import asyncHandler from "../utils/asyncHandler.js";

const getUserBlogs = asyncHandler(async(req,res,next)=>{
  if (!req.user) {
    return res.redirect('/');
  }
  const user = req.user;
  const blogs = await Blog.find({createdBy:user._id}).sort({updatedAt: 'desc'});
  res.status(200).render('userBlogs',{
    blogs,
    user
  })
})

export default getUserBlogs;