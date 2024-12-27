import User from "../models/userModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import { createTokenForUser } from "../utils/authentication.js";

const updateProfile = asyncHandler(async (req,res,next)=>{
  //first we verify the user and then update
  //we need to find the user that we want to update
  //find it using email which has not been changed
  //then we need to reassign the jwt token with the new payload
  //no need to verify the user since he has already been verified
  const { fullname, email, about, oldPassword} = req.body;
  //now verify using the email and password
  await User.verifyUser(email,oldPassword)
  const newUser = {
    fullname,
    email,
    about,
  }
  if (req.file) newUser.avatar = `/avatars/${req.file.filename}`;
  if (req.body.newPassword) newUser.password = req.body.newPassword;
  const user = await User.findOneAndUpdate({email},{newUser},{new: true});
  console.log(user);
  console.log(newUser);
  //now either i logout and ask the user to login again or provide new token
  const token = createTokenForUser(user);
  res.cookie('token',token);
  res.status(200).redirect('/')
})

export default updateProfile;