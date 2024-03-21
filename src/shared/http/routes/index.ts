import productsRouter from '@modules/products/routes/products.routes';
import { Router, Response } from 'express';


const routes = Router();

routes.get('/', (response: Response) => {
  response.send('Hello World!🎁');
});
routes.use('/products',productsRouter);

export default routes;
