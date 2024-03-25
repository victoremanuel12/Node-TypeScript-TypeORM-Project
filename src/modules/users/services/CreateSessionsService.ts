import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/Repositories/UsersRepository';
import AppError from '@shared/errors/appError';
import { compare } from 'bcryptjs';

interface IRequestCreateUser {
  name: string;
  email: string;
  password: string;
}
class CreateSessionsService {
  public async execute({ email, password }: IRequestCreateUser): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) throw new AppError('Incorret User Credentials');
    const passwordConfimed: boolean = await compare(password, user.password);
    if (!passwordConfimed) throw new AppError('Incorret Password');

    return user;
  }
}
export default CreateSessionsService;
