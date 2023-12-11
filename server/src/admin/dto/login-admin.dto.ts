import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginAdminDto {
  @IsNotEmpty() readonly username: string;
  @IsNotEmpty() readonly password: string;
}
