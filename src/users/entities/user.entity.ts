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
  readonly id: string;

  @ApiProperty()
  @IsString()
  readonly createdAt: Date;

  @ApiProperty()
  @IsString()
  readonly updatedAt: Date;

  // extends from CreateUserDto but return a tyerror
  @ApiProperty({
    required: true,
  })
  @IsString()
  @Type(() => String)
  readonly username: string;

  @ApiProperty({
    required: true,
  })
  @IsEmail()
  @Type(() => String)
  readonly email: string;

  @ApiProperty({
    required: true,
  })
  @IsEnum(UserRole)
  readonly role: 'ADMIN' | 'USER';
}
export { User, UserRole };
