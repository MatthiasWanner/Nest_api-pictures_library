import { Module } from '@nestjs/common';
import { PicturesService } from './pictures.service';
import { PicturesController } from './pictures.controller';
import { PrismaService } from '@src/prisma.service';

@Module({
  controllers: [PicturesController],
  providers: [PicturesService, PrismaService],
})
export class PicturesModule {}
