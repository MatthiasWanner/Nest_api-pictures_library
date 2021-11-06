import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class ProfileWhereArgs {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @Type(() => String)
  id?: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @Type(() => String)
  userId?: string;
}

export class ProfileWhereIdArgs {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Type(() => String)
  id!: string;
}

export class ProfileWhereUserIdArgs {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Type(() => String)
  userId!: string;
}
