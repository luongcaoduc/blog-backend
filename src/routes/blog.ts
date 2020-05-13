import { Router } from 'express';
import {
  listBlogs, addBlog, deleteBlog, getBlog, updateBlog, uploadBlogImage
} from '../controller/blog';

import multer from 'multer';

const upload = multer({
  dest: 'blogImages'
})


const router: Router = Router();

router
  .route('/')
  .get(listBlogs)
  .post(addBlog);


router
  .route('/:id')
  .put(updateBlog)
  .delete(deleteBlog)
  .get(getBlog);

router
  .post('/upload', upload.single('image'), uploadBlogImage);


export default router;
