import { Request, Response } from 'express';
import User from '../models/user';

export interface IRequest extends Request {
  token: any,
  user: any
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const userData = await User.findOne({email: req.body.email});

    if (userData) {
      return res.status(403).send('User is already exist');
    }
    //console.log(req.body);
    const user: any = new User(req.body);

    await user.save();

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
}

export const getUser = async (req: IRequest, res: Response) => {
  try {
    const user: any = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
}

export const updateUser =  async (req: IRequest, res: Response) => {
  try {
    const user: any = await User.findByIdAndUpdate(req.user._id, {
      $set: {
        name: req.body.name,
        username: req.body.user,
        email: req.body.email,
        updated_at: Date.now()
      }
    })

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(200).send(user);

  } catch (error) {
    res.status(500).send(error);
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const user: any = await User.findCredentials(req.body.email, req.body.password);
    const token: any = await user.generateToken();


    res.status(200).send({ user, token });
  } catch (error) {
    res.status(500).send(error);
  }
}