import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

export const prismaErrors = {
  P2002: (fields: string[]) =>
    `Unique constraint failed on field: ${fields.join(', ')}`,
  P2025: (cause: string) =>
    `An operation failed because it depends on one or more records that were required but not found. ${cause}`,
};

export const getPrismaError = ({
  code,
  meta,
  name,
}: PrismaClientKnownRequestError) => {
  if (!code) {
    switch (name) {
      case 'NotFoundError':
        return new NotFoundException('Resource not found');
    }
  } else if (!Object.keys(prismaErrors).includes(code)) {
    return new InternalServerErrorException(
      `Unhandled ${code} prisma error code`,
    );
  } else {
    switch (code) {
      case 'P2002':
        const { target } = meta as UniqueConstraintMeta;
        return new BadRequestException(prismaErrors.P2002(target));
      case 'P2025':
        const { cause } = meta as NotFoundDependRecordMeta;
        return new BadRequestException(prismaErrors.P2025(cause));
    }
  }
};

export interface UniqueConstraintMeta {
  target: string[];
}

export interface NotFoundDependRecordMeta {
  cause: string;
}
