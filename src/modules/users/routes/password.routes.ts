import { Router } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';
import ForgotPasswordController from '../Controller/ForgotPasswordController';
const passswordRouter = Router();

const forgotPasswordController = new ForgotPasswordController();
passswordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordController.create,
);

export default passswordRouter;
