if (require.main === module) {
  seed().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

async function seed() {
  console.info('Seeding database...');

  console.info('Seeded database successfully');
}
