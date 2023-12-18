import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { AuthService } from './auth.service';
import { LoginStatus } from './interfaces/login-status.interface';
import { JwtPayload } from './interfaces/payload.interface';
import { RegistrationStatus } from './interfaces/regisration-status.interface';
import { LoginAdminDto } from 'dto/login-admin.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { Deletestatus } from './interfaces/delete-status.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus =
      await this.authService.register(createUserDto);
    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus> {
    console.log('login', loginUserDto);
    return await this.authService.login(loginUserDto);
  }
  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() UserDto: UserDto,
  ): Promise<UserDto> {
    let result: UserDto;
    const updateResult = await this.authService.update(id, UserDto);
    if (updateResult.success) {
      result = await this.authService.findUserFromAuth(id);
    }
    return result;
  }

  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<Deletestatus> {
    return await this.authService.delete(id);
  }

  @Post('adminlogin')
  public async adminLogin(
    @Body() loginAdminDto: LoginAdminDto,
  ): Promise<LoginStatus> {
    return await this.authService.adminLogin(loginAdminDto);
  }

  @Get('whoami')
  @UseGuards(AuthGuard())
  public async testAuth(@Req() req: any): Promise<JwtPayload> {
    return req.user;
  }
}
