import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma.service';
import { ProfileWhereArgs } from './classes/profile-where.args';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProfileDto) {
    const { userId, ...rest } = data;
    return await this.prisma.profile.create({
      data: { ...rest, user: { connect: { id: userId } } },
    });
  }

  async findAll() {
    return await this.prisma.profile.findMany();
  }

  async findOne(args: ProfileWhereArgs) {
    return await this.prisma.profile.findFirst({ where: { ...args } });
  }

  async update(id: string, data: UpdateProfileDto) {
    return await this.prisma.profile.update({ where: { id }, data });
  }

  async remove(id: string) {
    return await this.prisma.profile.delete({ where: { id } });
  }
}
