// admin.service.ts

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginAdminDto } from '../../dto/login-admin.dto';
import { AdminEntity } from './entity/admin.entity';
import { AdminDto } from '../../dto/admin.dto';
import { comparePasswords } from 'src/shared/utils';
import { toAdminDto, toUserDto } from 'src/shared/mapper';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';
import { UpdateStatus } from 'src/auth/interfaces/update-status.interface';
import { Deletestatus } from 'src/auth/interfaces/delete-status.interface';
import { ProductDto } from 'src/product/dto/product.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepo: Repository<AdminEntity>,
    private readonly usersService: UserService,
    private readonly productService: ProductService,
  ) {}
  async findOne(options?: object): Promise<AdminDto> {
    const admin = await this.adminRepo.findOne(options);

    return toAdminDto(admin);
  }

  async getAllUsers(): Promise<UserDto[]> {
    const users = await this.usersService.getAllUsers();
    return users;
  }
  async findUserFromAuth(id: string): Promise<UserDto> {
    return await this.usersService.findOne({
      where: { id },
    });
  }
  async updateUser(id: string, updateUserDto: UserDto): Promise<UpdateStatus> {
    let status: UpdateStatus = {
      success: true,
      message: 'user updated',
    };
    try {
      await this.usersService.updateUser(id, updateUserDto);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async deleteUser(id: string): Promise<Deletestatus> {
    let status: Deletestatus = {
      success: true,
      message: 'user deleted',
    };
    try {
      await this.usersService.deleteUser(id);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async findByLogin({ username, password }: LoginAdminDto): Promise<AdminDto> {
    const admin = await this.adminRepo.findOne({ where: { username } });

    if (!admin) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    // compare passwords
    const areEqual = await comparePasswords(admin.password, password);
    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return toAdminDto(admin);
  }

  //product
  async getAllProducts(): Promise<ProductDto[]> {
    const products = await this.productService.getAllProduct();
    return products;
  }
  async deleteProduct(id: string): Promise<Deletestatus> {
    let status: Deletestatus = {
      success: true,
      message: 'product deleted',
    };
    try {
      await this.productService.deleteProduct(id);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }

  async findProduct(id: string): Promise<ProductDto> {
    return await this.productService.findOneProduct({
      where: { id },
    });
  }

  async updateProduct(
    id: string,
    updateProductDto: ProductDto,
  ): Promise<UpdateStatus> {
    let status: UpdateStatus = {
      success: true,
      message: 'product updated',
    };
    try {
      await this.productService.updateProduct(id, updateProductDto);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }
    return status;
  }
}
