import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class Picture {
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
  @Type(() => String)
  readonly description?: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @Type(() => String)
  readonly url!: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @Type(() => String)
  readonly profileId!: string; // TODO: this field will not exist when auth providing api
}
