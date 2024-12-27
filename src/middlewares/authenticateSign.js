import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/userModel.js";
import { createTokenForUser } from "../utils/authentication.js";

const authenticateSignin = asyncHandler(async(req,res,next)=>{
  const { email, password } = req.body;
  const user = await User.verifyUser(email, password);
  const token = createTokenForUser(user);
  res.cookie('token',token);
  res.status(200).redirect('/')
})

export default authenticateSignin;