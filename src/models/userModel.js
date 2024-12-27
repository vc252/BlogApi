import mongoose from 'mongoose';
import argon2 from 'argon2';
import customUserNotFoundError from '../errors/customUserNotFound.js';
import customIncorrectPassword from '../errors/customIncorrectPassword.js';

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  about: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 5000
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  },
  avatar: {
    type: String,
    default: '/images/defaultAvatar.jpg',
    required: false
  },
  role: {
    type: String,
    enum: ['USER','ADMIN'],
    default: 'USER'
  }
},{timestamps: true});


//this method doesn't work because the next is passed implicitly by mongoose
//so if we are expecting a next argument there will be a type error
//we still need to add next as a part of the function signature
// userSchema.pre('save',asyncHandler(async function(next) {
//   const user = this;
//   if (!user.isModified()) {
//     return next();
//   }
//   const hash = await argon2.hash(user.password);
//   user.password = hash;
//   next();
// }))

//hash the password before saving using argon2
userSchema.pre('save',async function(next) {
  try {
    const user = this;
    if (!user.isModified(['password'])) {
      return next();
    }
    const hash = await argon2.hash(user.password);
    user.password = hash;
    return next();
  } catch (error) {
    next(error)
  }
})

userSchema.static('verifyUser',async function (email,password) {
  try {
    const user = await this.findOne({email});
    if (!user) {
      throw new customUserNotFoundError('no user with this email found');
    }
    if (!await argon2.verify(user.password,password)) {
      throw new customIncorrectPassword('password did not match');
    }
    //no need to send the password back 
    return {...user._doc, password: undefined};

  } catch(err) {
    throw err;
  }
})

const User = mongoose.model('User',userSchema);

export default User;