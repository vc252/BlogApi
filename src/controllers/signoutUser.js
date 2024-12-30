const signoutUser = (req,res,next) => {
  res.cookie('token','');
  res.redirect('/');
}

export default signoutUser;