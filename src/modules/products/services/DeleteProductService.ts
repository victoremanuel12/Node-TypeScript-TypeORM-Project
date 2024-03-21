import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/appError';
import { IDeleteProduct } from '../interfaces/IDeleteProduct';

class DeleteProductService {
  public async execute({ id }: IDeleteProduct): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository);
    const product = await productRepository.findOne(id);
    if (!product) throw new AppError(`Product not found`, 404);
    productRepository.remove(product);
  }
}
export default DeleteProductService;
