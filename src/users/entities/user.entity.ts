import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { Type } from 'class-transformer';

enum UserRole {
  ADMIN,
  USER,
}

class User {
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
  readonly username!: string;

  @ApiProperty({
    required: true,
  })
  @IsEmail()
  @Type(() => String)
  readonly email!: string;

  @ApiProperty({
    required: true,
  })
  @IsEnum(UserRole)
  readonly role!: 'ADMIN' | 'USER';
}

const select = {
  id: true,
  username: true,
  email: true,
  role: true,
  createdAt: true,
  updatedAt: true,
};

export { User, UserRole, select };
