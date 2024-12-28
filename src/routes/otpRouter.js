import { Router } from "express";
import getOtpverificationPage from "../controllers/getOtpVerificationPage.js";
import { sendOtp,verifyOtp } from "../middlewares/otpController.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/userModel.js";

const otpRouter = Router();

otpRouter.route('/signup')
  .get(sendOtp,getOtpverificationPage)
  .post(verifyOtp,asyncHandler(async (req,res,next)=>{
    await User.create(req.session.newUser);
    return res.status(200).redirect('/');
  }))

export default otpRouter;