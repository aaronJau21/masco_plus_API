import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Express } from 'express';

export class CreateMarcaDto {
  @IsString()
  name: string;

  @IsBoolean()
  @IsOptional()
  activate: boolean;

}
