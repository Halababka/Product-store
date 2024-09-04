import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = [];
  for (let i = 0; i < 1000000; i++) {
    users.push({
      firstName: `User${i}`,
      lastName: `LastName${i}`,
      age: Math.floor(Math.random() * 50) + 18,
      gender: i % 2 === 0 ? 'male' : 'female',
      problems: Math.random() < 0.1, // 10% пользователей имеют проблемы
    });
  }

  console.log('Start seeding...');
  await prisma.user.createMany({
    data: users,
  });
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
