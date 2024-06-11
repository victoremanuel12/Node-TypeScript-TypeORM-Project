import { Router } from 'express';
import multer from 'multer';
import uploadsConfig from '@config/upload';
import { Joi, Segments, celebrate } from 'celebrate';
import UserController from '../Controller/UserController';
import UserAvatarController from '../Controller/UserAvatarController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
const userRouter = Router();

const userController = new UserController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadsConfig);
userRouter.get('/', isAuthenticated, userController.all);
userRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  userController.userById,
);
userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create,
);
userRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().uuid().required(),
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.number().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  userController.update,
);
userRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  userController.delete,
);
userRouter.patch(
  '/avatar/',
  isAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);


export default userRouter;