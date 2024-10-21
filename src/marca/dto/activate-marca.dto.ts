import { IsBoolean } from 'class-validator';

export class ActivateMarcaDto {
  @IsBoolean()
  activate: boolean;
}
