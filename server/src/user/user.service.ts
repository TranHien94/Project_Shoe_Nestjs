import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toUserDto } from 'src/shared/mapper';
import { comparePasswords, toPromise } from 'src/shared/utils';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async findOne(options?: object): Promise<UserDto> {
    const user = await this.userRepo.findOne(options);
    return toUserDto(user);
  }
  async getAllUsers(): Promise<UserDto[]> {
    const users = await this.userRepo.find();
    return users.map((user) => toUserDto(user));
  }

  async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.userRepo.findOne({ where: { username } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = await comparePasswords(user.password, password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return toUserDto(user);
  }

  async findByPayload({ username }: any): Promise<UserDto> {
    return await this.findOne({
      where: { username },
    });
  }
  async create(userDto: CreateUserDto): Promise<UserDto> {
    const { username, password, email } = userDto;
    // check if the user exists in the db
    const userInDb = await this.userRepo.findOne({
      where: { username },
    });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const user: UserEntity = await this.userRepo.create({
      username,
      password,
      email,
    });
    await this.userRepo.save(user);
    return toUserDto(user);
  }

  async updateUser(id: string, updateUser: UserDto): Promise<UserDto> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    user.username = updateUser.username || user.username;
    user.password = updateUser.password || user.password;
    user.email = updateUser.email || user.email;
    await this.userRepo.save(user);
    return toUserDto(user);
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const result = await this.userRepo.delete(user.id);
    return result.affected > 0;
  }
}



