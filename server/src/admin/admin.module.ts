import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './entity/admin.entity';
import { AdminController } from './admin.controller';
import { UsersModule } from 'src/user/user.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    UsersModule,
    ProductModule,
    TypeOrmModule.forFeature([AdminEntity])],
  providers: [AdminService],
  exports: [AdminService],
  controllers: [AdminController]
})
export class AdminModule {}
