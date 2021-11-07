import * as common from '@nestjs/common';
import * as swagger from '@nestjs/swagger';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { MorganInterceptor } from 'nest-morgan';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { getPrismaError } from '@src/utils/prisma.utils';

// TODO: type return, error handling
@common.UseInterceptors(MorganInterceptor('combined'))
@swagger.ApiTags('Users')
@common.Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @swagger.ApiOkResponse({ type: [User] })
  @common.Get()
  async findAll() {
    try {
      return await this.service.findAll();
    } catch (error) {
      throw getPrismaError(error as PrismaClientKnownRequestError);
    }
  }

  // TODO: type return, error handling
  @swagger.ApiOkResponse({ type: User })
  @swagger.ApiNotFoundResponse()
  @common.Get(':username')
  async findOne(@common.Param('username') username: string) {
    try {
      return await this.service.findOne(username);
    } catch (error) {
      throw getPrismaError(error as PrismaClientKnownRequestError);
    }
  }

  // TODO: type return, error handling
  @swagger.ApiOkResponse({ type: User })
  @common.Post()
  async create(@common.Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.service.create(createUserDto);
    } catch (error) {
      throw getPrismaError(error as PrismaClientKnownRequestError);
    }
  }

  // TODO: type return, error handling
  @swagger.ApiOkResponse({ type: User })
  @swagger.ApiNotFoundResponse({ type: common.NotFoundException }) // TODO: Write Not Found Exception class to swagger doc
  @common.Patch(':id')
  async update(
    @common.Param('id') id: string,
    @common.Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      return await this.service.update(id, updateUserDto);
    } catch (error) {
      throw getPrismaError(error as PrismaClientKnownRequestError);
    }
  }

  // TODO: type return, error handling
  @swagger.ApiNoContentResponse({ description: 'No content' })
  @swagger.ApiNotFoundResponse()
  @common.Delete(':id')
  @common.HttpCode(common.HttpStatus.NO_CONTENT)
  async remove(@common.Param('id') id: string) {
    try {
      return await this.service.remove(id);
    } catch (error) {
      throw getPrismaError(error as PrismaClientKnownRequestError);
    }
  }
}
