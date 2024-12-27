import { z } from 'zod';

const validateSignup = (req,res,next)=>{
  //to check the pattern
  const fullnameRegex = /[A-Za-z]+\s[A-Za-z]+/;
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  //validating using zod
  const requiredBody = z.object({
    fullname: z.string().min(3,'minimum 3 characters in fullname').max(50,'maximum 50 characters in fullname')
    .refine( value => fullnameRegex.test(value) ),
    email: z.string()
    .email('email should be of format hello@gmail.com'),
    about: z.string().min(1,'at least write one char about yourself').max(5000,'character limit reached'),
    password: z.string()
    .min(8,'password must be of minimum 8 length')
    .max(50,'password must be of maximum 50 length')
    .refine( value => passwordRegex.test(value),'password must contain atleast 1 Upper,1 Lower,1 speacial and 1 numeric character')
  })

  const parsedDataWithSuccess = requiredBody.safeParse(req.body);

  if (!parsedDataWithSuccess.success) {
    const error = parsedDataWithSuccess.error;
    error.statusCode = 403;
    error.name = 'invalid signup format';
    return next(error);
  }

  next();
}

export default validateSignup;
