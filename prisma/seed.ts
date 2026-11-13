import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const fiction = await prisma.genre.create({
    data: { name: 'Fiction' },
  });

  const science = await prisma.genre.create({
    data: { name: 'Science' },
  });

  const technology = await prisma.genre.create({
    data: { name: 'Technology' },
  });

  const history = await prisma.genre.create({
    data: { name: 'History' },
  });

  await prisma.user.createMany({
    data: [
      {
        name: 'Admin Librarian',
        email: 'librarian@example.com',
        role: Role.LIBRARIAN,
      },
      {
        name: 'John Patron',
        email: 'john@example.com',
        role: Role.PATRON,
      },
    ],
  });

  await prisma.book.createMany({
    data: [
      { title: 'The Great Adventure', author: 'James Smith', publishedAt: new Date(), genreId: fiction.id },
      { title: 'Lost in Time', author: 'Sarah White', publishedAt: new Date(), genreId: fiction.id },
      { title: 'The Silent Forest', author: 'Peter Green', publishedAt: new Date(), genreId: fiction.id },
      { title: 'Modern Physics', author: 'Albert Reed', publishedAt: new Date(), genreId: science.id },
      { title: 'Biology Basics', author: 'Anne Brown', publishedAt: new Date(), genreId: science.id },
      { title: 'Space Exploration', author: 'Helen Star', publishedAt: new Date(), genreId: science.id },
      { title: 'Learn JavaScript', author: 'Code Master', publishedAt: new Date(), genreId: technology.id },
      { title: 'NestJS Fundamentals', author: 'David Tech', publishedAt: new Date(), genreId: technology.id },
      { title: 'Prisma in Action', author: 'Jane Developer', publishedAt: new Date(), genreId: technology.id },
      { title: 'Database Design', author: 'Michael Data', publishedAt: new Date(), genreId: technology.id },
      { title: 'Ancient Kingdoms', author: 'Mark Stone', publishedAt: new Date(), genreId: history.id },
      { title: 'World War Stories', author: 'Henry King', publishedAt: new Date(), genreId: history.id },
      { title: 'The Renaissance', author: 'Lucy Hill', publishedAt: new Date(), genreId: history.id },
      { title: 'African Civilizations', author: 'John Africa', publishedAt: new Date(), genreId: history.id },
      { title: 'Future Computing', author: 'Kevin Tech', publishedAt: new Date(), genreId: technology.id },
    ],
  });
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });