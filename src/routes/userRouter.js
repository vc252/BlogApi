import { Router } from "express";
import createUser from "../controllers/createUser.js";
import getSignupPage from "../controllers/getSignupPage.js";
import validateSignup from "../middlewares/validateSignup.js";
import authenticateSignin from "../middlewares/authenticateSign.js";
import getSigninPage from "../controllers/getSigninPage.js";
import signoutUser from "../controllers/signoutUser.js";
import validateSignin from "../middlewares/validateSignin.js";
import { avatarUpload } from "../middlewares/multer.js";
import getProfilePage from "../controllers/getProfilePage.js";

const userRouter = Router();

userRouter.route('/signup')
  .get(getSignupPage)
  .post(validateSignup,avatarUpload.single('avatar'),createUser)

userRouter.route('/signin')
  .get(getSigninPage)
  .post(validateSignin,authenticateSignin)

userRouter.route('/edit')
  .get(getProfilePage)

userRouter.get('/signout',signoutUser);

export default userRouter;