import CreateUserService from '../services/CreateUserService';
import ListUserService from '../services/ListUsersService';
import User from '../typeorm/entities/User';
import { Response, Request } from 'express';
import DeleteUsersService from '../services/DeleteUsersService';
import ShowUserByIdService from '../services/ShowUserById';
import UpdateUserService from '../services/UpdateUsersService';

export default class UserController {
  public async all(
    resquest: Request,
    response: Response,
  ): Promise<Response<Array<User>>> {
    const listProductSerivce = await new ListUserService();
    const users = await listProductSerivce.execute();
    return response.json(users);
  }
  public async userById(
    resquest: Request,
    response: Response,
  ): Promise<Response<User>> {
    const { id } = resquest.params;
    const showProductsService = await new ShowUserByIdService();
    const product = await showProductsService.execute({ id });
    return response.json(product);
  }

  public async create(
    request: Request,
    response: Response,
  ): Promise<Response<User>> {
    const { name, email, password } = request.body;
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({ name, email, password });
    return response.json(user);
  }
  public async update(
    request: Request,
    response: Response,
  ): Promise<Response<User>> {
    const { id, name, email, password } = request.body;
    const updateProductsService =  new UpdateUserService();
    const product = await updateProductsService.execute({
      id,
      name,
      email,
      password,
    });
    return response.json(product);
  }
  public async delete(
    resquest: Request,
    response: Response,
  ): Promise<Response<User>> {
    const { id } = resquest.params;
    const deleteProductService = new DeleteUsersService();
    const product = await deleteProductService.execute({ id });
    return response.json(product);
  }
}
