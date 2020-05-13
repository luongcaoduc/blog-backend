import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/user';

export interface Iauth extends Request {
  token: any;
  user: any;
}

const auth = async (req: Iauth, res: Response, next: NextFunction) => {
  try {
    console.log('hello')
    const token: any = req.header('x-access-token').replace('Bearer ', '');
    console.log(token);
    const decoded: any = jwt.verify(token, 'caoduc');
    console.log(decoded);
    const user: any = await User.findById({ _id: decoded._id });

    if (!user) {
      throw new Error();

    }

    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' })
  }


}

export default auth;