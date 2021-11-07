import * as common from '@nestjs/common';
import * as swagger from '@nestjs/swagger';
import { MorganInterceptor } from 'nest-morgan';

import { PicturesService } from './pictures.service';
import { CreatePictureDto } from './dto/create-picture.dto';
import { UpdatePictureDto } from './dto/update-picture.dto';
import { Picture } from './entities/picture.entity';
import { getPrismaError } from '@src/utils/prisma.utils';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@common.UseInterceptors(MorganInterceptor('combined'))
@swagger.ApiTags('Pictures')
@common.Controller('pictures')
export class PicturesController {
  constructor(private readonly picturesService: PicturesService) {}

  // TODO: type return, error handling
  @swagger.ApiOkResponse({ type: Picture })
  @common.Post()
  async create(@common.Body() createPictureDto: CreatePictureDto) {
    try {
      return await this.picturesService.create(createPictureDto);
    } catch (error) {
      throw getPrismaError(error as PrismaClientKnownRequestError);
    }
  }

  // TODO: type return, error handling
  @swagger.ApiOkResponse({ type: [Picture] })
  @common.Get()
  async findAll() {
    try {
      return await this.picturesService.findAll();
    } catch (error) {
      throw getPrismaError(error as PrismaClientKnownRequestError);
    }
  }

  // TODO: type return, error handling
  @swagger.ApiOkResponse({ type: Picture })
  @common.Get(':id')
  async findOne(@common.Param('id') id: string) {
    try {
      return await this.picturesService.findOne(id);
    } catch (error) {
      throw getPrismaError(error as PrismaClientKnownRequestError);
    }
  }

  // TODO: type return, error handling
  @swagger.ApiOkResponse({ type: Picture })
  @common.Patch(':id')
  async update(
    @common.Param('id') id: string,
    @common.Body() updatePictureDto: UpdatePictureDto,
  ) {
    try {
      return await this.picturesService.update(id, updatePictureDto);
    } catch (error) {
      throw getPrismaError(error as PrismaClientKnownRequestError);
    }
  }

  // TODO: type return, error handling
  @swagger.ApiNoContentResponse({ description: 'No content' })
  @common.Delete(':id')
  @common.HttpCode(common.HttpStatus.NO_CONTENT)
  async remove(@common.Param('id') id: string) {
    try {
      return await this.picturesService.remove(id);
    } catch (error) {
      throw getPrismaError(error as PrismaClientKnownRequestError);
    }
  }
}
