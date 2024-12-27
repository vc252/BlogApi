const getAddblogPage = (req,res,next)=>{
  res.status(200).render('addBlog',{
    user: req.user
  });
}

export default getAddblogPage;