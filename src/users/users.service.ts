import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async create(data: CreateUserDto): Promise<User> {
    const { email, password, username } = data;

    const hashedPassword = bcrypt.hashSync(password, +process.env.BCRYPT_SALT);

    return await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id },
      data,
    });
    return user;
  }

  async remove(id: string) {
    await this.prisma.user.delete({ where: { id } });
    return { messages: 'User deleted' };
  }
}
