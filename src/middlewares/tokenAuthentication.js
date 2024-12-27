import { verifyToken } from "../utils/authentication.js";

const checkForAuthenticationCookie = (req,res,next) => {
  const token = req.cookies.token;
  if (!token) {
    //then we don't have access
    return next();
  }
  const payload = verifyToken(token);
  if (!payload) {
    return next();
  }
  req.user = payload;
  next();
}

export default checkForAuthenticationCookie;