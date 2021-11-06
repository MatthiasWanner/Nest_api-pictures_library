import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class Album {
  @ApiProperty()
  @IsString()
  readonly id!: string;

  @ApiProperty()
  @IsString()
  readonly createdAt!: Date;

  @ApiProperty()
  @IsString()
  readonly updatedAt!: Date;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @Type(() => String)
  readonly title!: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly description!: string; // TODO: this field will not exist when auth providing api

  @ApiProperty({
    required: true,
  })
  @IsString()
  @Type(() => Boolean)
  readonly published!: boolean;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @Type(() => String)
  readonly profileId!: string; // TODO: this field will not exist when auth providing api
}
