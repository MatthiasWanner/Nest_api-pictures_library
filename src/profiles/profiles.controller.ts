import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { MorganInterceptor } from 'nest-morgan';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly service: ProfilesService) {}

  @UseInterceptors(MorganInterceptor('combined'))
  @Post()
  async create(@Body() createProfileDto: CreateProfileDto) {
    try {
      return await this.service.create(createProfileDto);
    } catch (error) {
      return error;
    }
  }

  @UseInterceptors(MorganInterceptor('combined'))
  @Get()
  async findAll() {
    try {
      return await this.service.findAll();
    } catch (error) {
      return error;
    }
  }

  @UseInterceptors(MorganInterceptor('combined'))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.service.findOne(+id);
    } catch (error) {
      return error;
    }
  }

  @UseInterceptors(MorganInterceptor('combined'))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    try {
      return await this.service.update(+id, updateProfileDto);
    } catch (error) {
      return error;
    }
  }

  @UseInterceptors(MorganInterceptor('combined'))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.service.remove(+id);
    } catch (error) {
      return error;
    }
  }
}
