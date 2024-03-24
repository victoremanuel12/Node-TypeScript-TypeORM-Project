import productsRouter from '@modules/products/routes/products.routes';
import UserRouter from '@modules/users/routes/UserRouter';
import { Router, Response } from 'express';


const routes = Router();

routes.get('/', (response: Response) => {
  response.send('Hello World!🎁');
});
routes.use('/products',productsRouter);
routes.use('/users',UserRouter);
export default routes;
