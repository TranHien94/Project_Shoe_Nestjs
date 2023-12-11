import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductEntity } from './entity/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { toPromise } from 'src/shared/utils';
import { ProductDto } from './dto/product.dto';
import { toProductDto } from 'src/shared/mapper';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productrepo: Repository<ProductEntity>,
  ) {}
  async findOneProduct(options?: object): Promise<ProductDto> {
    const product = await this.productrepo.findOne(options);
    return toProductDto(product);
  }

  async getAllProduct() {
    const listProduct = await this.productrepo.find();
    return listProduct;
  }
  async getProductById(id: string): Promise<ProductEntity> {
    const productById = await this.productrepo.findOne({ where: { id } });
    if (!productById) {
      throw new HttpException('Product is not exit', HttpStatus.BAD_REQUEST);
    }
    return productById;
  }
  async deleteProduct(id: string): Promise<boolean> {
    console.log('Deleting product with ID:', id);
    const product = await this.productrepo.findOne({ where: { id } });
    if (!product) {
      console.log('Product not found:', id);
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    const result = await this.productrepo.delete(product.id);
    console.log('Delete result:', result);
    return result.affected > 0;
  }

  async updateProduct(
    id: string,
    productUpdate: ProductDto,
  ): Promise<ProductDto> {
    let sample = await this.productrepo.findOne({ where: { id } });
    if (!sample) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    sample.name = productUpdate.name || sample.name;
    sample.brand_name = productUpdate.brand_name || sample.brand_name;
    sample.box_condition = productUpdate.box_condition || sample.box_condition;
    sample.category = productUpdate.category || sample.category;
    sample.collection_slugs =
      productUpdate.collection_slugs || sample.collection_slugs;
    sample.color = productUpdate.color || sample.color;
    sample.designer = productUpdate.designer || sample.designer;
    sample.details = productUpdate.details || sample.details;
    sample.gender = productUpdate.gender || sample.gender;
    sample.grid_picture_url =
      productUpdate.grid_picture_url || sample.grid_picture_url;
    sample.has_stock = productUpdate.has_stock || sample.has_stock;
    sample.keywords = productUpdate.keywords || sample.keywords;
    sample.main_picture_url =
      productUpdate.main_picture_url || sample.main_picture_url;
    sample.midsole = productUpdate.midsole || sample.midsole;
    sample.nickname = productUpdate.nickname || sample.nickname;
    sample.original_picture_url =
      productUpdate.original_picture_url || sample.original_picture_url;
    sample.shoe_condition =
      productUpdate.shoe_condition || sample.shoe_condition;
    sample.size_range = productUpdate.size_range || sample.size_range;
    sample.release_date = productUpdate.release_date || sample.release_date;
    sample.retail_price_cents =
      productUpdate.retail_price_cents || sample.retail_price_cents;

    const result = await this.productrepo.save(sample);
    return toPromise(toProductDto(result));
  }
}
