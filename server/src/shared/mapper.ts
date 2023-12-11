import { AdminDto } from 'src/admin/dto/admin.dto';
import { AdminEntity } from 'src/admin/entity/admin.entity';
import { ProductDto } from 'src/product/dto/product.dto';
import { ProductEntity } from 'src/product/entity/product.entity';
import { SampleDto } from 'src/sample/dto/sample.dto';
import { Sample } from 'src/sample/entity/sample.entity';
import { UserDto } from 'src/user/dto/user.dto';
import { UserEntity } from 'src/user/entity/user.entity';

export const toSampleDto = (data: Sample): SampleDto => {
  const { id, name, description } = data;

  const sampleDto: SampleDto = { id, name, description };
  return sampleDto;
};
export const toProductDto = (data: ProductEntity): ProductDto => {
  const {
    id,
    box_condition,
    brand_name,
    category,
    collection_slugs,
    color,
    designer,
    details,
    gender,
    grid_picture_url,
    has_picture,
    has_stock,
    keywords,
    main_picture_url,
    midsole,
    name,
    nickname,
    original_picture_url,
    product_template_id,
    release_date,
    release_date_unix,
    release_year,
    retail_price_cents,
    shoe_condition,
    silhouette,
    size_range,
    sku,
    slug,
    status,
    story_html,
    upper_material,
  } = data;
  const productDto: ProductDto = {
    id,
    box_condition,
    brand_name,
    category,
    collection_slugs,
    color,
    designer,
    details,
    gender,
    grid_picture_url,
    has_picture,
    has_stock,
    keywords,
    main_picture_url,
    midsole,
    name,
    nickname,
    original_picture_url,
    product_template_id,
    release_date,
    release_date_unix,
    release_year,
    retail_price_cents,
    shoe_condition,
    silhouette,
    size_range,
    sku,
    slug,
    status,
    story_html,
    upper_material,
  };
  return productDto
}

export const toUserDto = (data: UserEntity): UserDto => {
  const { id, username, password, email } = data;
  const userDto: UserDto = { id, username,password, email };
  return userDto;
};

export const toAdminDto = (data: AdminEntity): AdminDto => {
  const { id, username, email } = data;
  const adminDto: AdminDto = { id, username, email };
  return adminDto;
};