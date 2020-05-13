import { Request, Response } from 'express';
import AWS from 'aws-sdk';
import keys from '../config/dev';

const s3 =  new AWS.S3({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.accessSecretKeyId
})

