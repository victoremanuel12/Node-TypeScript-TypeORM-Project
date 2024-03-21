import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/appError';
import { UsersRepository } from '../typeorm/Repositories/UsersRepository';
interface IDeleteUser{
  id:string;
}
class DeleteUsersService {
  public async execute({ id }: IDeleteUser): Promise<void> {
    const userRepository = getCustomRepository(UsersRepository);
    const product = await userRepository.findOne(id);
    if (!product) throw new AppError(`Product not found`, 404);
    userRepository.remove(product);
  }
}
export default DeleteUsersService;
