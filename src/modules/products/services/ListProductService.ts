import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/Product';

class ListProductService {
  public async execute(): Promise<Array<Product>> {
    const productRepository = getCustomRepository(ProductRepository);
    const products = productRepository.find();
    return products;
  }
}

export default ListProductService;
