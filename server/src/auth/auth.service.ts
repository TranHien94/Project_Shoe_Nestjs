import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { LoginStatus } from './interfaces/login-status.interface';
import { JwtPayload } from './interfaces/payload.interface';
import { RegistrationStatus } from './interfaces/regisration-status.interface';
import { LoginAdminDto } from 'dto/login-admin.dto';
import { AdminService } from 'src/admin/admin.service';
import { UpdateStatus } from './interfaces/update-status.interface';
import { Deletestatus } from './interfaces/delete-status.interface';
import { AdminDto } from 'dto/admin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'user registered',
    };

    try {
      await this.usersService.create(userDto);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }

    return status;
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginStatus> {
    // const {username, password} = loginUserDto;
    const user = await this.usersService.findByLogin(loginUserDto);
    // generate and sign token
    const token = this._createToken(user);
    return {
      ...token,
      username: user.username,
    };
  }

  async findUserFromAuth(id: string): Promise<UserDto> {
    return await this.usersService.findOne({
      where: { id },
    });
  }
  async update(id: string, updateUserDto: UserDto): Promise<UpdateStatus> {
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

  async delete(id: string): Promise<Deletestatus> {
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

  async adminLogin(loginAdminDto: LoginAdminDto): Promise<LoginStatus> {
    const admin = await this.adminService.findByLogin(loginAdminDto);
    if (!admin) {
      throw new HttpException(
        'Invalid admin credentials',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = this._createAdminToken(admin);
    return {
      ...token,
      username: admin.username,
    };
  }

  async validateUser(payload: JwtPayload): Promise<UserDto> {
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private _createToken({ username }: UserDto): any {
    const expiresIn = process.env.EXPIRESIN;

    const user: JwtPayload = { username };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn,
      accessToken,
    };
  }
  private _createAdminToken({ username }: AdminDto): any {
    const expiresIn = process.env.EXPIRESIN;

    const user: JwtPayload = { username };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn,
      accessToken,
    };
  }
}
