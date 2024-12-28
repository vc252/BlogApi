const getOtpverificationPage = (req,res,next) => {
  // console.log(JSON.stringify(req.session.newUser));
  res.render('otpVerification');
}

export default getOtpverificationPage;