import { Role } from '@prisma/client';
import { IsBoolean, IsEnum, IsString } from 'class-validator';

export class CreateTrabajadorDto {
  @IsString()
  name: string;

  @IsString()
  user_name: string;

  @IsString()
  password: string;

  @IsBoolean()
  activate: boolean;

  @IsEnum(Role)
  role: Role;
}
