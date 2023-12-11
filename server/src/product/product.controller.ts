import { Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { toPromise } from 'src/shared/utils';
import { ProductEntity } from './entity/product.entity';

@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  async findAll() {
    const products = await this.productService.getAllProduct();
    return toPromise({ products });
  }
  @Get(':id')
  async getProductById(@Param('id') id: string):Promise<ProductEntity> {
    const products = await this.productService.getAllProduct();
    return await this.productService.getProductById(id)
  }
  
}
