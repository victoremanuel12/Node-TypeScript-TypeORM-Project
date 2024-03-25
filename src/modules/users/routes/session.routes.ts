import { Router } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';
import SessionsController from '../Controller/SessionsController';
const sessionRouter = Router();
const sessionController = new SessionsController();

sessionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionController.createSession,
);

export default sessionRouter;
