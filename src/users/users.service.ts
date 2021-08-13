import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async create(data: Prisma.UserCreateInput) {
    const { email, password, username } = data;

    const hashedPassword = bcrypt.hashSync(password, +process.env.BCRYPT_SALT);

    await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });
    return { messages: 'User created' };
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
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
