import * as common from '@nestjs/common';
import * as swagger from '@nestjs/swagger';
import { MorganInterceptor } from 'nest-morgan';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import { getPrismaError } from '@src/utils/prisma.utils';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@common.UseInterceptors(MorganInterceptor('combined'))
@swagger.ApiTags('Albums')
@common.Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @swagger.ApiResponse({ type: Album })
  @common.Post()
  async create(@common.Body() createAlbumDto: CreateAlbumDto) {
    try {
      return await this.albumsService.create(createAlbumDto);
    } catch (error) {
      throw getPrismaError(error as PrismaClientKnownRequestError);
    }
  }

  @swagger.ApiResponse({ type: [Album] })
  @common.Get()
  async findAll() {
    try {
      return await this.albumsService.findAll();
    } catch (error) {
      throw getPrismaError(error as PrismaClientKnownRequestError);
    }
  }

  @swagger.ApiResponse({ type: Album })
  @common.Get(':id')
  async findOne(@common.Param('id') id: string) {
    try {
      return await this.albumsService.findOne(id);
    } catch (error) {
      throw getPrismaError(error as PrismaClientKnownRequestError);
    }
  }

  @swagger.ApiResponse({ type: Album })
  @common.Patch(':id')
  async update(
    @common.Param('id') id: string,
    @common.Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    try {
      return await this.albumsService.update(id, updateAlbumDto);
    } catch (error) {
      throw getPrismaError(error as PrismaClientKnownRequestError);
    }
  }

  @swagger.ApiNoContentResponse({ description: 'No content' })
  @common.Delete(':id')
  @common.HttpCode(common.HttpStatus.NO_CONTENT)
  async remove(@common.Param('id') id: string) {
    try {
      return await this.albumsService.remove(id);
    } catch (error) {
      throw getPrismaError(error as PrismaClientKnownRequestError);
    }
  }
}
