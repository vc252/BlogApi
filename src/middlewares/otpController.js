import Otp from "../models/otoModel.js";
import asyncHandler from "../utils/asyncHandler.js";
import customOtpVerificationError from "../errors/customOtpVerficationError.js";

function RandomInt(max) {
  return Math.floor(Math.random()*max);
}

function otpGenerator(digits) {
  let otp = 0;
  for (let i=0; i<digits; i++) {
    const digit = RandomInt(10);
    if (i==digits-1 && digit===0) {
      digit = 1;
    }
    otp += Math.pow(10,i) * digit;
    // console.log(otp);
  }
  return otp;
}

async function generateUniqueOtp(digits) {
  let otp = otpGenerator(digits);
  let result = await Otp.findOne({otp});
  while (result) {
    // console.log('resultOtp')
    otp = otpGenerator(digits);
    result = Otp.findOne({otp});
  }
  return otp;
}

const sendOtp = asyncHandler(async (req,res,next) => {
  const otp = await generateUniqueOtp(6);
  const otpDoc = await Otp.create({
    email: req.session.newUser.email,
    otp
  })
  // console.log(JSON.stringify(otpDoc));
  next();
})

const verifyOtp = asyncHandler(async (req,res,next) => {
  const otp = req.body.otp;
  // console.log(JSON.stringify(req.session.newUser));
  const email = req.session.newUser.email;
  const actualOtp = await Otp.find({email}).sort({createdAt: 'desc'}).limit(1);
  if (actualOtp.length === 0 || actualOtp[0].otp != otp) {
    throw new customOtpVerificationError('otp wrong or expired');
  }
  next()
})

export {sendOtp,verifyOtp};