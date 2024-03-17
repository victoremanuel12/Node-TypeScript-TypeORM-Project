import { Router, Response, Request } from 'express';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
  response.send('Hello World!🎁');
});
export default routes;
