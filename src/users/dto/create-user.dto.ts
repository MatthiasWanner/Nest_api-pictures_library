import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { UserRole } from '@users/entities/user.entity';

class CreateUserDto {
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

  @ApiProperty({
    required: true,
  })
  @Type(() => String)
  @IsString()
  readonly password!: string;
}
export { CreateUserDto };
