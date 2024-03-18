import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entites/Product';
import { IShowProductService } from '../interfaces/IShowProductService';
import AppError from '@shared/errors/appError';

class ShowProductService {
  public async execute({ id }: IShowProductService): Promise<Product > {
    const productRepository = getCustomRepository(ProductRepository);
    const product = await productRepository.findOne(id);
    if(!product)
      throw  new AppError(`Product not found`, 404);
    return product;
  }
}
