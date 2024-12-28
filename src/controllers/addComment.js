import asyncHandler from "../utils/asyncHandler.js";
import Comment from "../models/commentsModel.js";

const addComment = asyncHandler(async(req,res,next)=>{
  if (!req.user) {
    return res.redirect('/');
  }

  // console.log(req.params)
  await Comment.create({
    content: req.body.content,
    createdBy: req.user._id,
    blogId: req.params.blogId
  })
  res.redirect(`/blog/${req.params.blogId}`);
})

export default addComment;