import { prisma } from '../lib/prisma';

async function main() {
  await prisma.course.upsert({
    where: { slug: 'advanced-analytics-hc-sql-bq' },
    update: {},
    create: {
      slug: 'advanced-analytics-hc-sql-bq',
      title: 'Advanced Analytics in Healthcare SQL & BigQuery',
      lessons: {
        create: [
          {
            slug: 'module-1-what-is-sql',
            title: 'Module 1 \u2013 What is SQL and Why Should I care',
            youtubeUrl: 'https://youtu.be/3K8XMZuhg-8',
            quiz: { questions: [] },
            xpReward: 100,
          },
          {
            slug: 'module-2-intro-healthcare-dataset',
            title: 'Module 2 \u2013 Intro to a Healthcare Dataset',
            youtubeUrl: 'https://youtu.be/bt3PVXmKxnw',
            quiz: { questions: [] },
            xpReward: 100,
          },
          {
            slug: 'module-3-sql-statement-basics',
            title: 'Module 3 \u2013 SQL Statement Basics Using Generative AI',
            youtubeUrl: 'https://youtu.be/P9LMgEfUDsY',
            quiz: { questions: [] },
            xpReward: 100,
          },
        ],
      },
    },
  });

  if (process.env.ADMIN_EMAIL) {
    await prisma.user.upsert({
      where: { email: process.env.ADMIN_EMAIL },
      update: { role: 'admin' },
      create: { email: process.env.ADMIN_EMAIL, role: 'admin' },
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
