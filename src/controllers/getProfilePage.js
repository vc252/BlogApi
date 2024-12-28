const getProfilePage = (req,res,next) => {
  if (!req.user) {
    return res.redirect('/');
  }
  res.status(200).render('editProfile',{
    user: req.user
  });
}

export default getProfilePage;