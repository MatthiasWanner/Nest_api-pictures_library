import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { MorganInterceptor } from 'nest-morgan';
import { Message } from '@src/messages.class';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @UseInterceptors(MorganInterceptor('combined'))
  @ApiOkResponse({ type: [User] })
  @Get()
  async findAll(): Promise<User[]> {
    try {
      return await this.service.findAll();
    } catch (error) {
      return error;
    }
  }

  @UseInterceptors(MorganInterceptor('combined'))
  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  @Get(':username')
  async findOne(
    @Param('username') username: string,
  ): Promise<User | NotFoundException> {
    try {
      const user = await this.service.findOne(username);
      if (!user) throw new NotFoundException('No User Found');
      return user;
    } catch (error) {
      return error;
    }
  }

  @UseInterceptors(MorganInterceptor('combined'))
  @ApiOkResponse({ type: User })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.service.create(createUserDto);
  }

  @UseInterceptors(MorganInterceptor('combined'))
  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse({ type: NotFoundException }) // TODO: Write Not Found Exception class to swagger doc
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User | NotFoundException> {
    try {
      const user = await this.service.findOne(id);
      if (!user) throw new NotFoundException('No User Found');
      return await this.service.update(id, updateUserDto);
    } catch (error) {
      return error;
    }
  }

  @UseInterceptors(MorganInterceptor('combined'))
  @ApiOkResponse({ type: Message })
  @ApiNotFoundResponse()
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Message | NotFoundException> {
    try {
      const user = await this.service.findOne(id);
      if (!user) throw new NotFoundException('No User Found');
      return await this.service.remove(id);
    } catch (error) {
      return error;
    }
  }
}
