import { EntityRepository, Repository } from 'typeorm';
import UserToken from '../entities/UserToken';
@EntityRepository(UserToken)
export class UserTokenRepository extends Repository<UserToken> {
  public async findByToken(token: string): Promise<UserToken | undefined> {
    const tokenEntity = await this.findOne({
      where: {
        token,
      },
    });
    return tokenEntity;
  }
  public async findById(Token_id: string): Promise<UserToken | undefined>  {
    const product = await this.findOne({
      where: {
        Token_id,
      },
    });
    return product;
  }
  public async generate(user_id : string ): Promise<UserToken | undefined> {
    const tokenGenereted = await this.create({
      user_id
    })
    this.save(tokenGenereted);
    return tokenGenereted;
  }
}
