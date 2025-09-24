import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern('products.findAll')
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @MessagePattern('products.findOne')
  findOne(id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @MessagePattern('products.create')
  create(product: Product): Promise<Product> {
    return this.productsService.create(product);
  }

  @MessagePattern('products.update')
  update(data: { id: number; product: Partial<Product> }): Promise<Product> {
    return this.productsService.update(data.id, data.product);
  }

  @MessagePattern('products.remove')
  remove(id: number): Promise<void> {
    return this.productsService.remove(id);
  }
}