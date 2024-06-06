
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/Repositories/UsersRepository';
import { UserTokenRepository } from '../typeorm/Repositories/UserTokenRepository';
import { isAfter, addHours} from 'date-fns'
import AppError from '@shared/errors/appError';
import { hash } from 'bcryptjs';
interface IRequestCreateUser {
  token: string;
  password: string;
}
class ResetPasswordService{
  public async execute({token, password}: IRequestCreateUser): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const  userTokenRepository = getCustomRepository(UserTokenRepository);
    const userToken = await userTokenRepository.findByToken(token);
    if(!userToken) throw new AppError(`User token not found`, 404);
    const user = await usersRepository.findById(userToken.user_id);
    if(!user) throw new AppError(`User not found`, 404);
    const tokenCreatedAt = userToken.created_at
    const compareHours = addHours(tokenCreatedAt,2)
    if(isAfter(Date.now(), compareHours)) throw new AppError(`Token expired`, 401);
    user.password = await hash(password,8);
  }
}

export default ResetPasswordService;
