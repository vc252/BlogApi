const errorHandler = (err,req,res,next) => {
  res.status(err.statusCode || 500).json({
    name: err.name || 'internal server error',
    error: err
  })
}

export default errorHandler;