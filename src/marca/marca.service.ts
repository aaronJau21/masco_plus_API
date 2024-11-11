import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { IBrandFindAll } from './interfaces/brand-find_all.interface';
import { ActivateMarcaDto } from './dto/activate-marca.dto';
import { Marcas } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class MarcaService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    data: CreateMarcaDto,
    user: any,
    file: Express.Multer.File,
  ): Promise<Marcas> {
    const trabajador_id: any = user.id;

    if (!file) {
      throw new BadRequestException('No se ha cargado ningún archivo');
    }

    // Generar un nombre único para el archivo
    const filename = `${uuid.v4()}-${file.originalname}`;
    const uploadDir = path.join(__dirname, '..', '..', 'uploads', 'brand');

    // Crear el directorio si no existe
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uploadPath = path.join(uploadDir, filename);

    // Guardar el archivo en el sistema de archivos desde el buffer
    try {
      fs.writeFileSync(uploadPath, file.buffer);
    } catch (error) {
      console.error({ error });
      throw new BadRequestException('Error al guardar el archivo');
    }

    // Crear la marca en la base de datos
    const marca = await this.prismaService.marcas.create({
      data: {
        name: data.name,
        trabajador_id,
        image: uploadPath,
      },
    });

    return marca;
  }

  async findAll(): Promise<IBrandFindAll> {
    const brands = await this.prismaService.marcas.findMany();
    return { marcas: brands };
  }

  async findOne(id: number) {
    const brand = await this.prismaService.marcas.findFirst({
      where: { id },
    });

    if (!brand) throw new NotFoundException('No existe la marca');

    return { brand };
  }

  async update(id: number, data: UpdateMarcaDto) {
    await this.findOne(id);

    const brand = await this.prismaService.marcas.update({
      where: { id },
      data,
    });

    return { brand };
  }

  async activateBrand(id: number, data: ActivateMarcaDto, user: any) {
    await this.findOne(id);
    const trabajador_id: any = user.id;

    const activateOrDesactiveBrand = await this.prismaService.marcas.update({
      where: { id },
      data: {
        ...data,
        trabajador_id,
      },
    });

    return { brand: activateOrDesactiveBrand };
  }

  async listActivateBrand() {
    const listActivatedBrand = await this.prismaService.marcas.findMany({
      where: { activate: true },
    });

    return { marcas: listActivatedBrand };
  }
}
