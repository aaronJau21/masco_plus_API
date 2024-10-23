import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ICreateResponse } from 'src/shared/interfaces/create.response';
import { IBrandFindAll } from './interfaces/brand-find_all.interface';
import { ActivateMarcaDto } from './dto/activate-marca.dto';
import { Marcas } from '@prisma/client';

@Injectable()
export class MarcaService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(data: CreateMarcaDto, user: any): Promise<Marcas> {
    const trabajador_id: any = user.id;

    const marca = await this.prismaService.marcas.create({
      data: {
        ...data,
        trabajador_id,
      },
    });

    return marca;
  }

  async findAll(): Promise<IBrandFindAll> {
    const brands = await this.prismaService.marcas.findMany();

    return {
      marcas: brands,
    };
  }

  async findOne(id: number) {
    const brand = await this.prismaService.marcas.findFirst({
      where: { id },
    });

    if (!brand) throw new NotFoundException(`No existe la marca`);

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

    return {
      brand: activateOrDesactiveBrand,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} marca`;
  }
}
