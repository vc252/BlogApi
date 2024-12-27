import Blog from "../models/blogModel.js";
import asyncHandler from "../utils/asyncHandler.js";

const getEditBlogPage = asyncHandler(async (req,res,next)=>{
  //so we should have the blog id in the paramse
  const blog = await Blog.findById(req.params.blogId);
  res.status(200).render('editBlog',{
    user: req.user,
    blog
  })
})

export default getEditBlogPage;