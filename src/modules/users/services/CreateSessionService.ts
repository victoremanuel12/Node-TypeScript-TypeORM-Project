import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/Repositories/UsersRepository';
import AppError from '@shared/errors/appError';
import { sign } from 'jsonwebtoken';
import auth from '@config/auth'

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  user: User,
  token: string
}

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const tokenPayload = {
      user: {
        name: user.name,
        email:user.email
      }
    };

    const token = sign(tokenPayload, auth.jwt.secret, {
      subject: user.id,
      expiresIn: auth.jwt.expiresIn,
    });

    return {
      user,
      token
    };
  }
}

export default CreateSessionService;
