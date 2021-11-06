import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(protected readonly prisma: PrismaService) {}

  async create(data: CreateCategoryDto) {
    return await this.prisma.category.create({ data });
  }

  async findAll() {
    return await this.prisma.category.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.category.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateCategoryDto) {
    return await this.prisma.category.update({ where: { id }, data });
  }

  async remove(id: string) {
    return await this.prisma.category.delete({ where: { id } });
  }
}
