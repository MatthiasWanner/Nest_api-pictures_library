import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { User } from '@users/entities/user.entity';

class CreateUserDto extends OmitType(User, [
  'createdAt',
  'updatedAt',
  'id',
] as const) {
  @ApiProperty({
    required: true,
  })
  @Type(() => String)
  @IsString()
  readonly password!: string;
}
export { CreateUserDto };
