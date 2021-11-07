import { PrismaClient } from '@prisma/client';

if (require.main === module) {
  clean()
    .catch((error) => {
      console.error(error);
      process.exit(1);
    })
    .finally(() => {
      process.exit();
    });
}

async function clean() {
  console.info('Cleaning database...');

  const prisma = new PrismaClient();

  await prisma.user.deleteMany({
    where: { username: { not: 'admin' } },
  });

  prisma.$disconnect();

  console.info('Cleaned database successfully');
}
