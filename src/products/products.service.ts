import { Injectable } from '@nestjs/common';
import { ProductDTO } from './dto/product.dto';
import { PrismaService } from 'src/database/prisma.service';
import { randomUUID } from 'crypto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: ProductDTO) {
    const { name, description, value } = createProductDto;

    const product = await this.prisma.product.create({
      data: {
        id: randomUUID(),
        name,
        description,
        value,
      },
    });

    return {
      message: 'Produto Criado com sucesso',
      data: product,
    };
  }

  async findAll() {
    const products = await this.prisma.product.findMany();

    return products;
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    return product;
  }

  async update(id: string, updateProductDTO: ProductDTO) {
    const { name, description, value } = updateProductDTO;

    const product = await this.prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        value,
      },
    });

    return product;
  }

  async remove(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    await this.prisma.product.delete({
      where: { id },
    });

    return {
      message: 'Produto deletado com sucesso.',
      data: product,
    };
  }
}
