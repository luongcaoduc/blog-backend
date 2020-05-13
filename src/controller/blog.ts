import { Request, Response } from 'express';
import Blogs from '../models/blog';

export const listBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blogs.find({});

    res.status(200).send(blogs);
  } catch (error) {
    res.status(404).send(error);
  }
};

export const addBlog = async (req: Request, res: Response) => {
  try {
    const blog = new Blogs({
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      created_at: Date.now(),
      owner: req.body.owner
    });

    await blog.save();

    res.status(200).send(blog);
  } catch (error) {
    res.status(403).send(error);
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blogs.findByIdAndUpdate({ _id: req.params.id }, {
      $set: {
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        updated_at: Date.now(),
      },
    });

    res.status(200).send(blog);
  } catch (error) {
    res.status(404).send(error);
  }
};

export const getBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blogs.findById({ _id: req.params.id });

    res.status(200).send(blog);
  } catch (error) {
    res.status(404).send(error);
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const blog = await Blogs.findByIdAndDelete({ _id: req.params.id });

    res.status(200).send(blog);
  } catch (error) {
    res.status(404).send(error);
  }
};

export const uploadBlogImage = async (req: Request, res: Response) => {
  try {
    res.send('Upload success');
  } catch (error) {
    res.send(error);
  }
}
