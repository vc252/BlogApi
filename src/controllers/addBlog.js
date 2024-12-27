import asyncHandler from "../utils/asyncHandler.js";
import Blog from "../models/blogModel.js";

const addBlog = asyncHandler(async (req,res,next)=>{
  const {title, body} = req.body;
  //there was some error coming this is to ensure we don't add the blog
  //if there is no user logged in
  if (!req.user._id) {
    console.log('user not available');
    return res.status(500).redirect('/');
  }
  await Blog.create({
    title,
    body,
    coverImageURL: `/uploads/${req.file.filename}`,
    createdBy: req.user._id
  })
  return res.status(200).redirect('/');
})

export default addBlog;