import { PartialType } from '@nestjs/mapped-types';
import { CreateTrabajadorDto } from './createTrabajador.dto';

export class UpdateTrabajadorDto extends PartialType(CreateTrabajadorDto) {}
