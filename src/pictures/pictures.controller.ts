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
  create(@common.Body() createPictureDto: CreatePictureDto) {
    return this.picturesService.create(createPictureDto);
  }

  // TODO: type return, error handling
  @common.UseInterceptors(MorganInterceptor('combined'))
  @ApiOkResponse({ type: [Picture] })
  @common.Get()
  findAll() {
    return this.picturesService.findAll();
  }

  // TODO: type return, error handling
  @common.UseInterceptors(MorganInterceptor('combined'))
  @ApiOkResponse({ type: Picture })
  @common.Get(':id')
  findOne(@common.Param('id') id: string) {
    return this.picturesService.findOne(+id);
  }

  // TODO: type return, error handling
  @common.UseInterceptors(MorganInterceptor('combined'))
  @ApiOkResponse({ type: Picture })
  @common.Patch(':id')
  update(
    @common.Param('id') id: string,
    @common.Body() updatePictureDto: UpdatePictureDto,
  ) {
    return this.picturesService.update(+id, updatePictureDto);
  }

  // TODO: type return, error handling
  @common.UseInterceptors(MorganInterceptor('combined'))
  @ApiNoContentResponse({ description: 'No content' })
  @common.Delete(':id')
  remove(@common.Param('id') id: string) {
    return this.picturesService.remove(+id);
  }
}
