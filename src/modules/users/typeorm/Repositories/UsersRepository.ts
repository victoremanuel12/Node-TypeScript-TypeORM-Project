import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/User';
@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  public async findByName(name: string): Promise<User | undefined> {
    const product = await this.findOne({
      where: {
        name,
      },
    });
    return product;
  }
  public async findById(id: string): Promise<User | undefined> {
    const product = await this.findOne({
      where: {
        id,
      },
    });
    return product;
  }
  public async findByEmail(email: string): Promise<User | undefined> {
    const product = await this.findOne({
      where: {
        email,
      },
    });
    return product;
  }
}
