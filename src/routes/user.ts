import { Router } from 'express';
import { createUser, getUser, updateUser, login } from '../controller/user';
import auth from '../middlewares/auth';

const router: Router = Router();


router
  .route('/')
  .post(createUser);

router
  .route('/login')
  .post(login);

router
  .route('/:userId')
  .get(auth, getUser)
  .put(updateUser);


export default router;