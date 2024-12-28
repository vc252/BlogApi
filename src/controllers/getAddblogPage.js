const getAddblogPage = (req,res,next)=>{
  if (!req.user) {
    return res.redirect('/');
  }
  res.status(200).render('addBlog',{
    user: req.user
  });
}

export default getAddblogPage;