import { OmitType } from '@nestjs/swagger';
import { Album } from '../entities/album.entity';

export class CreateAlbumDto extends OmitType(Album, [
  'id',
  'createdAt',
  'updatedAt',
  'published',
] as const) {}
