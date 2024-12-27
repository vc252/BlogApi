import { z } from 'zod'

const validateSignin = (req,res,next) => {
  const requiredBody = z.object({
    email: z.string().max(50,'max email length should be 100'),
    password: z.string().max(50,'max password length should be 50')
  })

  const parsedDataWithSuccess = requiredBody.safeParse(req.body);

  if (!parsedDataWithSuccess.success) {
    const error = parsedDataWithSuccess.error;
    error.statusCode = 403;
    error.name = 'invalid signin format';
    return next(error);
  }

  next();
}

export default validateSignin;