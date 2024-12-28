import { Router } from "express"
import getAddblogPage from "../controllers/getAddblogPage.js";
import { coverUpload } from "../middlewares/multer.js";
import addBlog from "../controllers/addBlog.js";
import readBlog from "../controllers/readBlog.js";
import addComment from "../controllers/addComment.js";
import getEditBlogPage from "../controllers/getEditBlogPage.js";
import editBlog from "../controllers/editBlog.js";
import deleteBlog from "../controllers/deleteBlog.js";

const blogRouter = Router();

blogRouter.route('/add')
  .get(getAddblogPage)
  .post(coverUpload.single('coverImage'),addBlog)

blogRouter.route('/edit/:blogId')
  .get(getEditBlogPage)
  .post(coverUpload.single('coverImage'),editBlog)

blogRouter.delete('/delete/:blogId',deleteBlog);

blogRouter.get('/:id',readBlog);

blogRouter.post('/comment/:blogId',addComment);

export default blogRouter;