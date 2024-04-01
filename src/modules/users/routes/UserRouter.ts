import { Router } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';
import UserController from '../Controller/UserController';
import isAuthenticated from '@shared/http/middlewares/isAutenticated';
const userRouter = Router();

const userController = new UserController();

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

export default userRouter;
