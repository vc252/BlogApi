import User from "../models/userModel.js";

const getAboutPage = async (req,res,next) => {
  const user = await User.findById(req.params.userId);
  res.render('about',{
    user: req.user,
    avatar: user.avatar,
    about: user.about
  })
}

export default getAboutPage;