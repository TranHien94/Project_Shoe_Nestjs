import { Global, Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as assert from 'assert';
import 'dotenv/config';
import * as moment from 'moment';
import * as os from 'os';
import * as pg from 'pg';
import { AdminEntity } from 'src/admin/entity/admin.entity';
import { ProductEntity } from 'src/product/entity/product.entity';
import { Sample } from 'src/sample/entity/sample.entity';
import { UserEntity } from 'src/user/entity/user.entity';
export const models = [Sample, UserEntity, ProductEntity, AdminEntity];

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DBNAME,
      synchronize: true, // tự đồng bộ table thông qua entities
      logging: true,
      entities: models,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule implements OnModuleInit {
  onModuleInit() {
    assert(process.env.MYSQL_DBNAME, 'url is not defined');
    pg.types.setTypeParser(1114, (str) => moment.utc(str).format());
  }
}
