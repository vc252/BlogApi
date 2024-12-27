const getProfilePage = (req,res,next) => {
  console.log(req.user);
  res.status(200).render('editProfile',{
    user: req.user
  });
}

export default getProfilePage;