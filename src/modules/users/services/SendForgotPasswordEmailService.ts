
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/Repositories/UsersRepository';
import { UserTokenRepository } from '../typeorm/Repositories/UserTokenRepository';
import AppError from '@shared/errors/appError';
interface IRequestCreateUser {
  email: string;
}
class SendForgotPasswordEmailService{
  public async execute({email}: IRequestCreateUser): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const  userTokenRepository = getCustomRepository(UserTokenRepository);
    const user = await usersRepository.findByEmail(email);
    if(!user) throw new AppError(`Could not find user with email: ${email}`,404);
    const tokenGenereted  = await userTokenRepository.generate(user.id);
    console.log(tokenGenereted);
  }
}

export default SendForgotPasswordEmailService;
