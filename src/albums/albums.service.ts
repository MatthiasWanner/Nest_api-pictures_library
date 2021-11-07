import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
  constructor(protected readonly prisma: PrismaService) {}
  async create(data: CreateAlbumDto) {
    return await this.prisma.album.create({ data });
  }

  async findAll() {
    return await this.prisma.album.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.album.findUnique({
      where: { id },
      rejectOnNotFound: true,
    });
  }

  async update(id: string, data: UpdateAlbumDto) {
    return await this.prisma.album.update({ where: { id }, data });
  }

  async remove(id: string) {
    return await this.prisma.album.delete({ where: { id } });
  }
}
