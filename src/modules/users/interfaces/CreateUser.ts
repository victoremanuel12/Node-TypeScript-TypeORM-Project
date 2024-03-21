import User from "../typeorm/entities/User";

interface IRequestCreateUser {
  name: string;
  email: string;
  password: string;
}
export interface ICreateUserService {
  execute(data: IRequestCreateUser): Promise<User>;
}