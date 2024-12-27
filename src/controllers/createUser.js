import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/userModel.js";

//handles user creation
const createUser = asyncHandler(async (req,res,next)=>{
  const { fullname, password, email, about } = req.body;
  const newUser = {
    fullname,
    password,
    about,
    email
  }
  //if the user has not uploaded an avatar then req.file would be undefined
  if (req.file) {
    newUser.avatar = `/avatars/${req.file.filename}`;
    console.log(newUser.avatar);
  }
  await User.create(newUser);
  return res.status(200).redirect('/')
})

export default createUser;