import productsRouter from '@modules/products/routes/products.routes';
import userRouter from '@modules/users/routes/UserRouter';
import passswordRouter from '@modules/users/routes/password.routes';

import sessionRouter from '@modules/users/routes/session.routes';
import { Router, Response } from 'express';


const routes = Router();

routes.get('/', (response: Response) => {
  response.send('Hello World!🎁');
});
routes.use('/products',productsRouter);
routes.use('/users',userRouter);
routes.use('/sessions',sessionRouter);
routes.use('/password',passswordRouter);

export default routes;
