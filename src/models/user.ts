import mongoose, { Model } from 'mongoose';
const Schema = mongoose.Schema;

import { NextFunction } from 'express';
import { IUser } from '../interfaces/IUser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export interface findCredentials extends Model<IUser> {
  findCredentials(email: string, password: string): any;
}


const UserSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    match: [/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i]
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
  },
  created_at: {
    type: Date,
  },
  updated_at: Date

}).index({email: 1})

UserSchema.virtual('blogs', {
  ref: 'Blog',
  localField: '_id',
  foreignField: 'owner'
})

UserSchema.methods.toJSON = function () {
  const user: any = this;
  const userObject = user.toObject();

  delete userObject.password;

  return userObject;
}

UserSchema.methods.generateToken = function() {
  const user: any = this;
  const token = jwt.sign({ _id: user._id.toString() }, 'caoduc');

  return token;
}

UserSchema.statics.findCredentials = async (email: string, password: string) => {

  const user: any = await User.findOne({ email: email });

  if (!user) {
    throw new Error('Unable to log in');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to log in')
  }

  return user;
}

UserSchema.pre('save', async function(next: NextFunction) {

  const user: any = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
})


const User = mongoose.model<IUser, findCredentials>('User', UserSchema);

export default User;