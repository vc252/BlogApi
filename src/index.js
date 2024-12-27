import express from 'express';
import 'dotenv/config'
import * as url from 'node:url';
import * as path from 'node:path';
import connectDB from './utils/db.js';
import userRouter from './routes/userRouter.js';
import errorHandler from './utils/errorHandler.js';
import cookieParser from 'cookie-parser';
import checkForAuthenticationCookie from './middlewares/tokenAuthentication.js';
import blogRouter from './routes/blogRouter.js';
import Blog from './models/blogModel.js';

connectDB();

const PORT = process.env.PORT || 3000;
//__dirname is not available in es6
const __filname = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filname);

const app = express();

//set the views to be served from views folder
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs')

//static files will be served from public folder
app.use(express.static(path.join(__dirname,'public')));
//used for parsing json and url data(for forms)
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
//checks the current user through cookie and add it to the req body 
app.use(checkForAuthenticationCookie);

app.use('/user',userRouter);
app.use('/blog',blogRouter);

app.get('/',async (req,res,next)=>{
  const allBlogs = await Blog.find().sort({updatedAt: 'desc'});
  res.status(200).render('home',{
    user: req.user,
    blogs: allBlogs
  });
})

//the default errorHandler
app.use(errorHandler);

app.listen(PORT,(err)=>{
  if (err) {
    console.error('server not able to start');
    process.exit(1);
  }
  console.log(`server started PORT:${PORT}`);
})
