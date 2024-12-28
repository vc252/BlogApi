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
import validateEdit from "../middlewares/validateEdit.js";
import updateProfile from "../controllers/updateProfile.js";
import getUserBlogs from "../controllers/getUserBlogs.js";
import getAboutPage from "../controllers/getAboutPage.js";

const userRouter = Router();

userRouter.route('/signup')
  .get(getSignupPage)
  //we need to add the multer middleware before accessing the body
  //because it is the middleware responsible for parsing the data
  .post(avatarUpload.single('avatar'),validateSignup,createUser)

userRouter.route('/signin')
  .get(getSigninPage)
  .post(validateSignin,authenticateSignin)

userRouter.route('/edit')
  .get(getProfilePage)
  .post(avatarUpload.single('avatar'),validateEdit,updateProfile)

userRouter.get('/about/:userId',getAboutPage)

userRouter.get('/blogs',getUserBlogs);

userRouter.get('/signout',signoutUser);

export default userRouter;