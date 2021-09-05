import * as common from '@nestjs/common';
import { PicturesService } from './pictures.service';
import { CreatePictureDto } from './dto/create-picture.dto';
import { UpdatePictureDto } from './dto/update-picture.dto';
import { ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Picture } from './entities/picture.entity';
import { MorganInterceptor } from 'nest-morgan';

@ApiTags('Pictures')
@common.Controller('pictures')
export class PicturesController {
  constructor(private readonly picturesService: PicturesService) {}

  // TODO: type return, error handling
  @common.UseInterceptors(MorganInterceptor('combined'))
  @ApiOkResponse({ type: Picture })
  @common.Post()
  async create(@common.Body() createPictureDto: CreatePictureDto) {
    return await this.picturesService.create(createPictureDto);
  }

  // TODO: type return, error handling
  @common.UseInterceptors(MorganInterceptor('combined'))
  @ApiOkResponse({ type: [Picture] })
  @common.Get()
  async findAll() {
    return await this.picturesService.findAll();
  }

  // TODO: type return, error handling
  @common.UseInterceptors(MorganInterceptor('combined'))
  @ApiOkResponse({ type: Picture })
  @common.Get(':id')
  async findOne(@common.Param('id') id: string) {
    return await this.picturesService.findOne(id);
  }

  // TODO: type return, error handling
  @common.UseInterceptors(MorganInterceptor('combined'))
  @ApiOkResponse({ type: Picture })
  @common.Patch(':id')
  async update(
    @common.Param('id') id: string,
    @common.Body() updatePictureDto: UpdatePictureDto,
  ) {
    return await this.picturesService.update(id, updatePictureDto);
  }

  // TODO: type return, error handling
  @common.UseInterceptors(MorganInterceptor('combined'))
  @ApiNoContentResponse({ description: 'No content' })
  @common.Delete(':id')
  async remove(@common.Param('id') id: string) {
    return await this.picturesService.remove(id);
  }
}
