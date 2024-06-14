import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/Repositories/UsersRepository';
import { UserTokensRepository } from '../typeorm/Repositories/UserTokenRepository';
import AppError from '@shared/errors/appError';
import EtherialMail from '@config/mail/EtherialMail';
import path from 'path';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const user = await usersRepository.findByEmail(email);
    if (!user) throw new AppError(`Could not find user with email: ${email}`, 404);

    const tokenGenerated = await userTokensRepository.generate(user.id);
    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );
    await EtherialMail.sendMail({
      to: {
        email: user.email,
        name: user.name,
      },
      subject: '[API VENDAS] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variebles: {
          name: user.name,
          token: tokenGenerated.token,
          link: `http://localhost:3333/password/reset?token=${tokenGenerated.token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;