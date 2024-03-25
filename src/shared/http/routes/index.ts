import productsRouter from '@modules/products/routes/products.routes';

import sessionRouter from '@modules/users/routes/session.routes';
import userRouter from '@modules/users/routes/userRouter';
import { Router, Response } from 'express';


const routes = Router();

routes.get('/', (response: Response) => {
  response.send('Hello World!🎁');
});
routes.use('/products',productsRouter);
routes.use('/users',userRouter);
routes.use('/sessions',sessionRouter);

export default routes;
