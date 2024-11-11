import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsBoolean()
  activate: boolean;

  @IsNumber()
  stock: number;

  @IsNumber()
  precio: number;

  @IsString()
  descripcion: string;

  @IsString()
  informacion_adicional:string;

  @IsNumber()
  marca_id: number;
}
