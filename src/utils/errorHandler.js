import customAccountExistsError from "../errors/customAccountExistsError.js";
import customImageFileError from "../errors/customImageFileError.js";
import customIncorrectPassword from "../errors/customIncorrectPassword.js";
import customMailError from "../errors/customMailError.js";
import customOtpVerificationError from "../errors/customOtpVerficationError.js";
import customUserNotFoundError from "../errors/customUserNotFound.js";

const errorHandler = (err,req,res,next) => {
  // throw err;
  if (err instanceof customIncorrectPassword) {
    return res.render('signin',{
      error: 'Incorrect Password'
    })
  }
  if (err instanceof customUserNotFoundError) {
    return res.render('signin',{
      error: 'Incorrect Email'
    })
  }
  if (err instanceof customAccountExistsError) {
    console.log('errorHandler account error');
    return res.render('signup',{
      error: 'Account in use'
    })
  }
  if (err instanceof customMailError) {
    //we also need to destroy the session
    return res.render('signup',{
      error: 'not able to send otp to this mail'
    })
  }
  if (err instanceof customOtpVerificationError) {
    return res.render('signup',{
      error: 'otp wrong or expired'
    })
  }
  if (err instanceof customImageFileError) {
    // return res.render('home',{
    //   error: 'please upload only image files'
    // })
    if (!req.user) {
      res.cookie('token','');
      return res.render('signup',{
        error: 'please upload only image files retard'
      })
    }
    return res.status(200).render('addBlog',{
      user: req.user,
      error: 'please upload only image files retard'
    });
  }
  //throw err;
  // res.status(err.statusCode || 500).json({
  //   name: err.name || 'internal server err',
  //   error: err
  // })
  res.cookie('token','');
  return res.render('signin',{
    error: 'some error occurred'
  })
}

export default errorHandler;