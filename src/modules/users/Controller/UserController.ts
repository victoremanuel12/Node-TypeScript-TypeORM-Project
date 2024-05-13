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
    const listuserSerivce = await new ListUserService();
    const users = await listuserSerivce.execute();
    return response.json(users);
  }
  public async userById(
    resquest: Request,
    response: Response,
  ): Promise<Response<User>> {
    const { id } = resquest.params;
    const showUserByIdService = await new ShowUserByIdService();
    const product = await showUserByIdService.execute({ id });
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
    const updateUserService =  new UpdateUserService();
    const product = await updateUserService.execute({
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
    const deleteUsersService = new DeleteUsersService();
    const product = await deleteUsersService.execute({ id });
    return response.json(product);
  }
}
