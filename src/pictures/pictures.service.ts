import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma.service';
import { CreatePictureDto } from './dto/create-picture.dto';
import { UpdatePictureDto } from './dto/update-picture.dto';

@Injectable()
export class PicturesService {
  constructor(protected readonly prisma: PrismaService) {}

  async create(data: CreatePictureDto) {
    return await this.prisma.picture.create({ data });
  }

  async findAll() {
    return await this.prisma.picture.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.picture.findUnique({
      where: { id },
      rejectOnNotFound: true,
    });
  }

  async update(id: string, data: UpdatePictureDto) {
    return await this.prisma.picture.update({ where: { id }, data });
  }

  async remove(id: string) {
    return await this.prisma.picture.delete({ where: { id } });
  }
}
