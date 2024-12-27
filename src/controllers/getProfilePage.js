const getProfilePage = (req,res,next) => {
  res.status(200).render('editProfile',{
    user: req.user
  });
}

export default getProfilePage;