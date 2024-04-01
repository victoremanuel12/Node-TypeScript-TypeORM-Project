import ListProductService from '../services/ListProductService';
import { Response, Request } from 'express';
import ShowProductService from '../services/ShowProductService';
import CreateProductService from '../services/CreateProductService';
import UpdateProductService from '../services/UpdateProductService';
import Product from '../typeorm/entities/Product';
import DeleteProductService from '../services/DeleteProductService';

export default class ProductController {
  public async all(
     resquest: Request,
    response: Response,
  ): Promise<Response<Product>> {
    const listProductSerivce = await new ListProductService();
    const products = await listProductSerivce.execute();
    return response.json(products);
  }
  public async prodctById(
    resquest: Request,
    response: Response,
  ): Promise<Response<Product>> {
    const { id } = resquest.params;
    const showProductsService = await new ShowProductService();
    const product = await showProductsService.execute({ id });
    return response.json(product);
  }
  public async create(
    resquest: Request,
    response: Response,
  ): Promise<Response<Product>> {
    const { name, price, quantity } = resquest.body;
    const createProductService = new CreateProductService();
    const product = await  createProductService.execute({ name, price, quantity });
    return response.json(product);
  }
  public async update(
    request: Request,
    response: Response,
  ): Promise<Response<Product>> {
    const { id, name, price, quantity } = request.body;
    const updateProductsService = new UpdateProductService();
    const product = await updateProductsService.execute({
      id,
      name,
      price,
      quantity,
    });
    return response.json(product);
  }
  public async delete(
    resquest: Request,
    response: Response,
  ): Promise<Response<Product>> {
    const { id} = resquest.params;
    const deleteProductService = new DeleteProductService();
    const product = await deleteProductService.execute({id});
    return response.json(product);
  }
}
