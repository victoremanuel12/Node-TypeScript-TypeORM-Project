import { getCustomRepository } from "typeorm";
import AppError from "@shared/errors/appError";
import User from '../typeorm/entities/User';
import { UsersRepository } from "../typeorm/Repositories/UsersRepository";
import { ICreateUserService } from "../interfaces/CreateUser";

interface IRequestCreateUser {
  name: string;
  email: string;
  password: string;
}
class CreateUserService  implements ICreateUserService{
  public async execute({ name, email, password }: IRequestCreateUser): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const emailAlredyExists = await usersRepository.findByEmail(email);

    if (emailAlredyExists)
      throw new AppError('Email address already used.');

    const user = usersRepository.create({
      email,
      name,
      password,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
