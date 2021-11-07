import * as dotenv from 'dotenv';
import * as faker from 'faker';
import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';

export const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

if (require.main === module) {
  dotenv.config();

  const { BCRYPT_SALT } = process.env;

  if (!BCRYPT_SALT) {
    throw new Error('BCRYPT_SALT environment variable must be defined');
  }

  populate(+BCRYPT_SALT)
    .catch((error) => {
      console.error(error);
      process.exit(1);
    })
    .finally(() => {
      process.exit();
    });
}

async function populate(salt: number) {
  console.info('Populating database...');

  const prisma = new PrismaClient();

  const { profile } = await prisma.user.create({
    data: {
      username: faker.internet.userName(),
      password: hashSync('password', salt),
      email: faker.internet.email(),
      role: 'USER',
      profile: {
        create: {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          avatarUrl: faker.image.avatar(),
          albums: {
            createMany: {
              data: new Array(3).fill(null).map(() => ({
                title: faker.lorem.sentence(randomNumber(1, 3)),
                description: faker.lorem.paragraph(),
              })),
            },
          },
        },
      },
    },
    select: {
      profile: {
        select: {
          albums: {
            select: {
              id: true,
            },
          },
          id: true,
        },
      },
    },
  });

  const { albums, id: profileId } = profile as {
    id: string;
    albums: {
      id: string;
    }[];
  };

  Promise.all(
    albums.map(async ({ id }) => {
      await prisma.album.update({
        where: { id },
        data: {
          categories: {
            create: {
              profileId,
              name: faker.lorem.word(),
            },
          },
          pictures: {
            create: new Array(randomNumber(5, 10)).fill(null).map(() => ({
              url: faker.image.imageUrl(),
              title: faker.lorem.sentence(randomNumber(1, 3)),
              description: faker.lorem.paragraph(),
              profileId,
            })),
          },
        },
      });
    }),
  );

  //  const albums =  new Array(3).fill(null).map(() => ({
  //     title: faker.lorem.sentence(randomNumber(1, 3)),
  //     description: faker.lorem.paragraph(),
  //     categories: {
  //       create: {
  //         name: faker.lorem.word(),
  //       },
  //     },

  //     pictures: {
  //       createMany: {
  //         data: new Array(randomNumber(5, 10)).fill(null).map(() => ({
  //           url: faker.image.imageUrl(),
  //           title: faker.lorem.sentence(randomNumber(1, 3)),
  //           description: faker.lorem.paragraph(),
  //         })),
  //       },
  //     },

  prisma.$disconnect();

  console.info('Populated database successfully');
}
