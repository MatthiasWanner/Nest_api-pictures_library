import * as common from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { MorganInterceptor } from 'nest-morgan';
import {
  ApiNoContentResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Profile } from './entities/profile.entity';

@ApiTags('Profiles')
@common.Controller('profiles')
export class ProfilesController {
  constructor(private readonly service: ProfilesService) {}

  // TODO: type return, error handling
  @common.UseInterceptors(MorganInterceptor('combined'))
  @ApiOkResponse({ type: Profile })
  @common.Post()
  async create(@common.Body() createProfileDto: CreateProfileDto) {
    try {
      return await this.service.create(createProfileDto);
    } catch (error) {
      return error;
    }
  }

  // TODO: type return, error handling
  @common.UseInterceptors(MorganInterceptor('combined'))
  @ApiOkResponse({ type: [Profile] })
  @common.Get()
  async findAll() {
    try {
      return await this.service.findAll();
    } catch (error) {
      return error;
    }
  }

  // TODO: type return, error handling
  @common.UseInterceptors(MorganInterceptor('combined'))
  @ApiOkResponse({ type: Profile })
  @common.Get(':id')
  async findOne(@common.Param('id') id: string) {
    try {
      return await this.service.findOne({ id });
    } catch (error) {
      return error;
    }
  }

  // TODO: type return, error handling
  @common.UseInterceptors(MorganInterceptor('combined'))
  @ApiOkResponse({ type: Profile })
  @common.Patch(':id')
  async update(
    @common.Param('id') id: string,
    @common.Body() updateProfileDto: UpdateProfileDto,
  ) {
    try {
      return await this.service.update(id, updateProfileDto);
    } catch (error) {
      return error;
    }
  }

  // TODO: type return, error handling
  @common.UseInterceptors(MorganInterceptor('combined'))
  @ApiNoContentResponse({ description: 'No content' })
  @common.Delete(':id')
  async remove(@common.Param('id') id: string) {
    try {
      await this.service.remove(id);
      return common.HttpStatus.NO_CONTENT;
    } catch (error) {
      return error;
    }
  }
}
