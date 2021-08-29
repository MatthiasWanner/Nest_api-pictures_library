import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class Message {
  @ApiProperty()
  @IsString()
  message!: string;
}
