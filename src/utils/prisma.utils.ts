import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

export const prismaErrors = {
  P2002: (fields: string[]) =>
    `Unique constraint failed on field: ${fields.join(', ')}`,
  P2025: (cause: string) => `${cause}`,
};

export const getPrismaError = ({
  code,
  meta,
  name,
  message,
}: PrismaClientKnownRequestError) => {
  if (!code) {
    switch (name) {
      case 'NotFoundError':
        return new NotFoundException('Resource not found');
      default:
        return new InternalServerErrorException(
          message || 'Unknow prisma Error',
        );
    }
  } else {
    switch (code) {
      case 'P2002':
        const { target } = meta as UniqueConstraintMeta;
        return new BadRequestException(prismaErrors.P2002(target));
      case 'P2025':
        const { cause } = meta as NotFoundDependRecordMeta;
        return new BadRequestException(prismaErrors.P2025(cause));
      default:
        return new InternalServerErrorException(
          `Unhandled ${code} prisma error code. message: ${message}`,
        );
    }
  }
};

export interface UniqueConstraintMeta {
  target: string[];
}

export interface NotFoundDependRecordMeta {
  cause: string;
}
