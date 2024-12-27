import jwt from 'jsonwebtoken'
const secret = process.env.SECRET_KEY;

const createTokenForUser = (user)=>{
  const payload = {
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
    avatar: user.avatar,
    about: user.about,
    role: user.role
  }
  const token = jwt.sign(payload,secret,{expiresIn: '1h'});
  return token;
}

const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token,secret);
    return payload;
  } catch(err) {
    return false;
  }
}

export {createTokenForUser,verifyToken};