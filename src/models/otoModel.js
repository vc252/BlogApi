import mongoose from "mongoose";
import customMailError from "../errors/customMailError.js";
import sendVerificationEmail from "../utils/sendVerifcationEmail.js";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  otp: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60*5 //otp expires in 5 minutes
  }
})

otpSchema.pre('save',async function(next) {
  //only send an email if a new otp is added
  try {
    if (this.isNew) {
      await sendVerificationEmail(this.email,this.otp);
    }
    next();
  } catch(err) {
    throw new customMailError('not able to send mail');
  }
})

const Otp = mongoose.model('Otp',otpSchema);

export default Otp;