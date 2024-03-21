import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/Product';
import AppError from '@shared/errors/appError';
import { IUpdateProduct } from '../interfaces/IUpdateProductService';

class UpdateProductService {
  public async execute({
    id,
    price,
    name,
    quantity,
  }: IUpdateProduct): Promise<Product > {
    const productRepository = getCustomRepository(ProductRepository);
    const product = await  productRepository.findOne(id);
    const productAlreadyExists = await productRepository.findByName(name);
    if (!product) throw new AppError(`Product not found`, 404);

    if (productAlreadyExists) throw new AppError('Product already exists', 400);
    product.name = name;
    product.price = price;
    product.quantity = quantity;

    productRepository.save(product);
    return product;
  }
}
export default  UpdateProductService;
