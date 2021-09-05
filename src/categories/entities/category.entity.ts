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

/* 
model Category {
  id        String   @id @default(uuid())
  name      String
  createdAt DateTime @default(now()) @map(name: "created_at")
  updatedAt DateTime @default(now()) @updatedAt @map(name: "updated_at")

  albums    Album[]
  profile   Profile @relation(fields: [profileId], references: [id])
  profileId String  @map(name: "profile_id")

  @@map(name: "categories")
}
*/
