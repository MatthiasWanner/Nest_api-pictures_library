import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class Category {
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
  readonly name!: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @Type(() => String)
  readonly profileId!: string; // TODO: this field will not exist when auth providing api
}
