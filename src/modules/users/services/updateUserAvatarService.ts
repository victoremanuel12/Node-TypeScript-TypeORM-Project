import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/Repositories/UsersRepository';
import AppError from '@shared/errors/appError';
import path from "path";
import uploadConfig from '@config/uploads';
import fs from "fs"
import User from '../typeorm/entities/User';
interface IRequest {
  avatarFileName: string;
  user_id: string;
}


class UpdateUserAvatarService {
  public async execute({ avatarFileName, user_id}: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      console.log(userAvatarFilePath)
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;
    await usersRepository.save(user);
    
    return user;
  }
}

export default UpdateUserAvatarService;
