import { Body, Controller, Get, Param, Put, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { toPromise } from 'src/shared/utils';
import { Deletestatus } from 'src/auth/interfaces/delete-status.interface';
import { UserDto } from 'src/user/dto/user.dto';
import { ProductDto } from 'src/product/dto/product.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Get('users')
  async findAll() {
    const users = await this.adminService.getAllUsers();
    return toPromise({ users });
  }
  @Put('users/:id')
  public async update(
    @Param('id') id: string,
    @Body() UserDto: UserDto,
  ): Promise<UserDto> {
    let result: UserDto;
    const updateResult = await this.adminService.updateUser(id, UserDto);
    if (updateResult.success) {
      result = await this.adminService.findUserFromAuth(id);
    }
    return result;
  }
  @Delete('users/:id')
  public async delete(@Param('id') id: string): Promise<Deletestatus> {
    console.log('delete user');
    return await this.adminService.deleteUser(id);
  }

  //Products
  @Get('products')
  async findAllProduct() {
    const product = await this.adminService.getAllProducts();
    return toPromise({ product });
  }

  @Delete('products/:id')
  public async deleteProduct(@Param('id') id: string): Promise<Deletestatus> {
    console.log('delete product');
    return await this.adminService.deleteProduct(id);
  }

  @Put('products/:id')
  public async updateProduct(
    @Param('id') id: string,
    @Body() ProductDto: ProductDto,
  ): Promise<ProductDto> {
    let result: ProductDto;
    const updateResult = await this.adminService.updateProduct(id, ProductDto);
    if (updateResult.success) {
      result = await this.adminService.findProduct(id);
    }
    return result;
  }
}
