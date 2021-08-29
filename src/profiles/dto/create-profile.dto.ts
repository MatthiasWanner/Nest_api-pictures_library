import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({
    required: false,
  })
  @IsString()
  @Type(() => String)
  readonly firstName?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @Type(() => String)
  readonly lastName?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @Type(() => String)
  readonly biography?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @Type(() => String)
  readonly avatarUrl?: string;

  @ApiProperty({
    required: true,
  })
  @IsEmail()
  @Type(() => String)
  readonly userId!: string;
}
