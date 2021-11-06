import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateProfileDto } from '../dto/create-profile.dto';

export class Profile extends CreateProfileDto {
  @ApiProperty()
  @IsString()
  readonly id!: string;

  @ApiProperty()
  @IsString()
  readonly createdAt!: Date;

  @ApiProperty()
  @IsString()
  readonly updatedAt!: Date;
}
