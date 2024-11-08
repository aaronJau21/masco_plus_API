import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateProductDto, user: any) {
    const trabajador_id = user.id;

    const product = await this.prisma.productos.create({
      data: {
        trabajador_id,
        ...data,
      },
    });

    return { product };
  }

  async findAll() {
    const products = await this.prisma.productos.findMany();
    return { products };
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
