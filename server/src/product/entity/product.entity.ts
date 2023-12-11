import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
export class ProductEntity {
  @PrimaryColumn('uuid')
  id: string;
  @Column({ name: 'box_condition', type: 'text', nullable: true })
  box_condition: string;
  @Column({ name: 'brand_name', type: 'text', nullable: true })
  brand_name: string;
  @Column({ name: 'category', type: 'text', nullable: true })
  category: string[];
  @Column({ name: 'collection_slugs', type: 'text', nullable: true })
  collection_slugs: string[];
  @Column({ name: 'color', type: 'text', nullable: true })
  color: string;
  @Column({ name: 'designer', type: 'text', nullable: true })
  designer: string;
  @Column({ name: 'details', type: 'text', nullable: true })
  details: string;
  @Column({ name: 'gender', type: 'text', nullable: true })
  gender: string[];
  @Column({ name: 'grid_picture_url', type: 'text', nullable: true })
  grid_picture_url: string;
  @Column({ name: 'has_picture', type: 'boolean', nullable: true })
  has_picture: boolean;
  @Column({ name: 'has_stock', type: 'boolean', nullable: true })
  has_stock: boolean;
  @Column({ name: 'keywords', type: 'text', nullable: true })
  keywords: string[];

  @Column({ name: 'main_picture_url', type: 'text', nullable: true })
  main_picture_url: string;

  @Column({ name: 'midsole', type: 'text', nullable: true })
  midsole: string;

  @Column({ name: 'name', type: 'text', nullable: true })
  name: string;

  @Column({ name: 'nickname', type: 'text', nullable: true })
  nickname: string;

  @Column({ name: 'original_picture_url', type: 'text', nullable: true })
  original_picture_url: string;

  @Column({ name: 'product_template_id', type: 'numeric', nullable: true })
  product_template_id: number;

  @Column({ name: 'release_date', type: 'date', nullable: true })
  release_date: Date;

  @Column({ name: 'release_date_unix', type: 'numeric', nullable: true })
  release_date_unix: number;

  @Column({ name: 'release_year', type: 'numeric', nullable: true })
  release_year: number;

  @Column({ name: 'retail_price_cents', type: 'numeric', nullable: true })
  retail_price_cents: number;

  @Column({ name: 'shoe_condition', type: 'text', nullable: true })
  shoe_condition: string;

  @Column({ name: 'silhouette', type: 'text', nullable: true })
  silhouette: string;

  @Column({ name: 'size_range', type: 'text', nullable: true })
  size_range: number[];

  @Column({ name: 'sku', type: 'text', nullable: true })
  sku: string;

  @Column({ name: 'slug', type: 'text', nullable: true })
  slug: string;

  @Column({ name: 'status', type: 'text', nullable: true })
  status: string;

  @Column({ name: 'story_html', type: 'text', nullable: true })
  story_html: string;

  @Column({ name: 'upper_material', type: 'text', nullable: true })
  upper_material: string;
}
