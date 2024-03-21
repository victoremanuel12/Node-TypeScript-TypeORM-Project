import ListUserService from '../services/ListUsersService';
import User from '../typeorm/entities/User';
import { Response } from 'express';

export default class ProductController {
  public async all(
    resquest: Request,
    response: Response,
  ): Promise<Response<User>> {
    const listProductSerivce = await new ListUserService();
    const products = await listProductSerivce.execute();
    return response.json(products);
  }
}
