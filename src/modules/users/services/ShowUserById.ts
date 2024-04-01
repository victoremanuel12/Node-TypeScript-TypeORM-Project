import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/appError';
import { UsersRepository } from '../typeorm/Repositories/UsersRepository';
import User from '../typeorm/entities/User';
interface IShowUserById{
  id: string;
}
class ShowUserByIdService {
  public async execute({ id }: IShowUserById): Promise<User > {
    const userRepository = getCustomRepository(UsersRepository);
    const user = await userRepository.findOne(id);
    if(!user)
      throw  new AppError(`Product not found`, 404);
    return user;
  }
}
export default ShowUserByIdService
