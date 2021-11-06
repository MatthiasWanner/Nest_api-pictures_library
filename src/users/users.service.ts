import { Injectable } from '@nestjs/common';
import { Message } from '@src/messages.class';
import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, select } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany({
      select,
    });
  }

  async findOne(username: string) {
    return await this.prisma.user.findUnique({
      where: { username },
      select,
    });
  }

  async create(data: CreateUserDto): Promise<User> {
    const { password: initialPassword, ...rest } = data;

    const password = bcrypt.hashSync(initialPassword, +process.env.BCRYPT_SALT);

    return await this.prisma.user.create({
      data: {
        ...rest,
        password,
      },
      select,
    });
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data,
      select,
    });
  }

  async remove(id: string): Promise<Message> {
    await this.prisma.user.delete({ where: { id } });
    return { message: 'User deleted' };
  }
}
