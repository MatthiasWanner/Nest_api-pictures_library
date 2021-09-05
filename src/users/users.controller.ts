import * as common from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { MorganInterceptor } from 'nest-morgan';
import { Message } from '@src/messages.class';

// TODO: type return, error handling
@ApiTags('Users')
@common.Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @common.UseInterceptors(MorganInterceptor('combined'))
  @ApiOkResponse({ type: [User] })
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
  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  @common.Get(':username')
  async findOne(@common.Param('username') username: string) {
    try {
      const user = await this.service.findOne(username);
      if (!user) throw new common.NotFoundException('No User Found');
      return user;
    } catch (error) {
      throw new common.HttpException(
        error as Message,
        common.HttpStatus.BAD_REQUEST,
      );
    }
  }

  // TODO: type return, error handling
  @common.UseInterceptors(MorganInterceptor('combined'))
  @ApiOkResponse({ type: User })
  @common.Post()
  async create(@common.Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.service.create(createUserDto);
  }

  // TODO: type return, error handling
  @common.UseInterceptors(MorganInterceptor('combined'))
  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse({ type: common.NotFoundException }) // TODO: Write Not Found Exception class to swagger doc
  @common.Patch(':id')
  async update(
    @common.Param('id') id: string,
    @common.Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const user = await this.service.findOne(id);
      if (!user) throw new common.NotFoundException('No User Found');
      return await this.service.update(id, updateUserDto);
    } catch (error) {
      return error;
    }
  }

  // TODO: type return, error handling
  @common.UseInterceptors(MorganInterceptor('combined'))
  @ApiNoContentResponse({ description: 'No content' })
  @ApiNotFoundResponse()
  @common.Delete(':id')
  async remove(@common.Param('id') id: string) {
    try {
      const user = await this.service.findOne(id);
      if (!user) throw new common.NotFoundException('No User Found');
      return await this.service.remove(id);
    } catch (error) {
      return error;
    }
  }
}
