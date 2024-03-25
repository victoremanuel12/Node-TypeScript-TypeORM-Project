import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/Repositories/UsersRepository';
import AppError from '@shared/errors/appError';
interface IUpdateUser{
  id : string;
  name: string;
  email: string;
  password: string;
}

class UpdateUserService {
  public async execute({
    id,
    name,
    email,
    password,
  }: IUpdateUser): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);
    const user : User | undefined = await  userRepository.findOne(id);
    const userAlreadyExists = await userRepository.findByName(name);
    if (!user) throw new AppError(`Product not found`, 404);

    if (userAlreadyExists) throw new AppError('User with the same name already exists', 400);
    user.name = name;
    user.email = email;
    user.password = password;
    userRepository.save(user);
    return user;
  }
}
export default  UpdateUserService;
