import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';

import connectDB from './config/db';

import blogRoute from './routes/blog';
import userRoute from './routes/user';


colors.enable();
dotenv.config({ path: './src/config/config.env' });

const app: Application = express();

app.use(cors());

// connect db
connectDB();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;


app.use('/api/blogs', blogRoute);
app.use('/api/users', userRoute);


app.listen(PORT, () => console.log(`Server is runng in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold));
