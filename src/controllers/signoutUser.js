const signoutUser = (req,res,next) => {
  if (!req.user) {
    return res.redirect('/');
  }
  res.cookie('token','');
  res.redirect('/');
}

export default signoutUser;