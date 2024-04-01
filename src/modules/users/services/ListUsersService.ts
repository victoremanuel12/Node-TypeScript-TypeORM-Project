import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/Repositories/UsersRepository';

class ListUserService {
  public async execute(): Promise<Array<User>> {
    const usersRepository = getCustomRepository(UsersRepository);
    const products = usersRepository.find();
    return products;
  }
}

export default ListUserService;
