const getSignupPage = (req,res,next) => {
  res.status(200).render('signup')
}

export default getSignupPage;