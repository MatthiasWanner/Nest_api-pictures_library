import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';

if (require.main === module) {
  seed().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

async function seed() {
  console.info('Seeding database...');

  console.info('Seeding database with custom seed...');

  console.info('Seeded database successfully');
}
