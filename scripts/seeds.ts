import * as dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';

if (require.main === module) {
  dotenv.config();

  const { BCRYPT_SALT } = process.env;

  if (!BCRYPT_SALT) {
    throw new Error('BCRYPT_SALT environment variable must be defined');
  }

  seed(+BCRYPT_SALT)
    .catch((error) => {
      console.error(error);
      process.exit(1);
    })
    .finally(() => {
      process.exit();
    });
}

async function seed(salt: number) {
  console.info('Seeding database...');

  const prisma = new PrismaClient();

  await prisma.user.create({
    data: {
      username: 'admin',
      password: hashSync('admin', salt),
      email: 'admin@seed.fr',
      role: 'ADMIN',
      profile: {
        create: {},
      },
    },
  });

  prisma.$disconnect();

  console.info('Seeded database successfully');
}
