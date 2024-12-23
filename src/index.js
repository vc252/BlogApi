import express from 'express';
import 'dotenv/config'
import * as url from 'node:url';
import * as path from 'node:path';
import connectDB from './utils/db.js';

connectDB();

const PORT = process.env.PORT || 3000;
const __filname = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filname);

const app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs')

app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/',(req,res,next)=>{
  res.status(200).render('index');
})

app.listen(PORT,(err)=>{
  if (err) {
    console.error('server not able to start');
    process.exit(1);
  }
  console.log(`server started PORT:${PORT}`);
})
