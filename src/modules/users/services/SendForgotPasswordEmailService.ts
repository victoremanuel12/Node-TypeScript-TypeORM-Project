
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/Repositories/UsersRepository';
import { UserTokensRepository } from '../typeorm/Repositories/UserTokenRepository';
import AppError from '@shared/errors/appError';
import EtherialMail from '@config/mail/EtherialMail';
interface IRequestCreateUser {
  email: string;
}
class SendForgotPasswordEmailService{
  public async execute({email}: IRequestCreateUser): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const  userTokensRepository = getCustomRepository(UserTokensRepository);
    const user = await usersRepository.findByEmail(email);
    if(!user) throw new AppError(`Could not find user with email: ${email}`,404);
    const tokenGenereted  = await userTokensRepository.generate(user.id);
    await EtherialMail.sendMail({
      sendTo:email,
      body:`Solcitação de redefinição de senha ${tokenGenereted.token}`,
    })
  }
}

export default SendForgotPasswordEmailService;
