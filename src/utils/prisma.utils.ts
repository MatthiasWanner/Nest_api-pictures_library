import * as nest from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

export const prismaErrors = {
  P2002: (fields: string[]) =>
    `Unique constraint failed on field: ${fields.join(', ')}`,
  P2025: (cause: string) => `${cause}`,
  P2003: (fieldName: string) =>
    `Foreign Key relation constraint failed on field: ${fieldName}`,
};

export const getPrismaError = ({
  code,
  meta,
  name,
  message,
}: PrismaClientKnownRequestError): nest.HttpException => {
  if (!code) {
    switch (name) {
      case 'NotFoundError':
        return new nest.NotFoundException('Resource not found');
      default:
        return new nest.InternalServerErrorException(
          message || 'Unknow prisma Error',
        );
    }
  } else {
    switch (code) {
      case 'P2002':
        const { target } = meta as UniqueConstraintMeta;
        return new nest.BadRequestException(prismaErrors.P2002(target));
      case 'P2003':
        const { field_name: fieldName } = meta as ForeignKeyConstraintError;
        return new nest.BadRequestException(prismaErrors.P2003(fieldName));
      case 'P2025':
        const { cause } = meta as NotFoundDependRecordMeta;
        return new nest.BadRequestException(prismaErrors.P2025(cause));
      default:
        return new nest.InternalServerErrorException(
          `Unhandled ${code} prisma error code. Message: ${message}
          `,
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

export interface ForeignKeyConstraintError {
  field_name: string;
}
