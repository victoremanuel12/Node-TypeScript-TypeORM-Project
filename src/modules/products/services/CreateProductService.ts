import { getCustomRepository } from "typeorm";
import { IRequestCreateProduct } from "../interfaces/IRequestCreateProduct";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/appError";
import Product from "../typeorm/entities/Product";

class CreateProductService
 {
   public async execute( {name, price, quantity} : IRequestCreateProduct): Promise<Product>{
    const productRepository = getCustomRepository(ProductRepository);
    const productAlreadyExists = await productRepository.findByName(name)
    if(productAlreadyExists)
      throw new AppError('Product already exists', 400)
    const product = productRepository.create({
      name,
      price,
      quantity,
    })
    await productRepository.save(product)
    return product;
   }
 }
 export default  CreateProductService;
