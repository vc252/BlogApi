import multer from "multer";
import customImageFileError from "../errors/customImageFileError.js";

const coverStorage = multer.diskStorage({
  destination: function(req,file,cb) {
    cb(null,'./src/public/uploads');
  },
  filename: function(req,file,cb) {
    cb(null,`${Date.now()}-${file.originalname}`);
  }
})

const avatarStorage = multer.diskStorage({
  destination: function(req,file,cb) {
    cb(null,'./src/public/avatars')
  },
  filename: function(req,file,cb) {
    cb(null,`${Date.now()}-${file.originalname}`)
  }
})

const coverUpload = multer({
  storage: coverStorage,
  limits: {
    fileSize:1000000
  },
  //check if it is an image file
  fileFilter(req,file,cb) {
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb( new customImageFileError('upload image files'));
    }
    cb(undefined,true);
  }
});

const avatarUpload = multer({
  storage: avatarStorage,
  limits: {
    fileSize:1000000
  },
  //check if it is an image file
  fileFilter(req,file,cb) {
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb( new customImageFileError('upload image files'));
    }
    cb(undefined,true);
  }
})

export {coverUpload,avatarUpload};