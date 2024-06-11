
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/Repositories/UsersRepository';
import { UserTokensRepository } from '../typeorm/Repositories/UserTokenRepository';
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
    const  userTokensRepository = getCustomRepository(UserTokensRepository);
    const userToken = await userTokensRepository.findByToken(token);
    if(!userToken) throw new AppError(`User token not found`, 404);
    const user = await usersRepository.findById(userToken.user_id);
    if(!user) throw new AppError(`User not found`, 404);
    const tokenCreatedAt = userToken.created_at
    const compareHours = addHours(tokenCreatedAt,2)
    if(isAfter(Date.now(), compareHours)) throw new AppError(`Token expired`, 401);
    user.password = await hash(password,8);
    usersRepository.save(user);
  }
}

export default ResetPasswordService;
