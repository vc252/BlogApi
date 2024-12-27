const getSigninPage = (req,res,next)=>{
  res.status(200).render('signin');
}

export default getSigninPage;