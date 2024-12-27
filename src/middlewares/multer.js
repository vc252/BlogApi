import multer from "multer";

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
      return cb( new Error('Please upload a valid image file'))
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
      return cb( new Error('Please upload a valid image file'))
    }
    cb(undefined,true);
  }
})

export {coverUpload,avatarUpload};