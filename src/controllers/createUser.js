import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/userModel.js";
import customAccountExistsError from "../errors/customAccountExistsError.js";

//handles user creation
const createUser = asyncHandler(async (req,res,next)=>{
  const { fullname, password, email, about } = req.body;
  const user = await User.findOne({email});
  if (user) {
    throw new customAccountExistsError('account already in use');
  }
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
  if (req.body.otpVerification) {
    //then we need to redirect to the otp route
    req.session.newUser = newUser;//store infor in the sesssion to register after otp verification
    return res.redirect('/otp/signup')
  }
  await User.create(newUser);
  return res.status(200).redirect('/')
})

export default createUser;