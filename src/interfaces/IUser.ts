import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string,
  username: string,
  email: string,
  password: string,
  created_at: Date,
  updated_at: Date
}
