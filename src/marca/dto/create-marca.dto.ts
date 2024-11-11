import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateMarcaDto {
  @IsString()
  name: string;

  @IsBoolean()
  @IsOptional()
  activate: boolean;

}
