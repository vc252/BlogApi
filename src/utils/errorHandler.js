import customIncorrectPassword from "../errors/customIncorrectPassword.js";
import customUserNotFoundError from "../errors/customUserNotFound.js";

const errorHandler = (err,req,res,next) => {
  console.log('hello');
  if (err instanceof customIncorrectPassword) {
    return res.render('signin',{
      error: 'Incorrect Password'
    })
  } else if (err instanceof customUserNotFoundError) {
    return res.render('signin',{
      error: 'Incorrect Email'
    })
  }
  throw err;
  res.status(err.statusCode || 500).json({
    name: err.name || 'internal server err',
    error: err
  })
}

export default errorHandler;