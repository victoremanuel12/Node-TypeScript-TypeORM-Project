import 'reflect-metadata'
import express,{ Response, Request,NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import AppError from '@shared/errors/appError';
import '@shared/typeorm';

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);
app.use(errors());
// middware de tratameto de erros, não sendo necessario utilizar try catch sempre!
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    console.log(error);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(3333, () => {
  console.log('Server listening on port 3333! 🎉');
});
