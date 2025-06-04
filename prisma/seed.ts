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
            quiz: {
              questions: [
                {
                  q: 'What does SQL stand for?',
                  choices: [
                    'Structured Query Language',
                    'Simple Query Logic',
                    'Sequential Query Language',
                  ],
                  a: 0,
                },
                {
                  q: 'Which feature of BigQuery removes the need for server management?',
                  choices: ['Serverless architecture', 'Local storage', 'Manual sharding'],
                  a: 0,
                },
              ],
            },
            labTemplate: { starter: 'SELECT 1;', language: 'sql' },
            xpReward: 100,
          },
          {
            slug: 'module-2-intro-healthcare-dataset',
            title: 'Module 2 \u2013 Intro to a Healthcare Dataset',
            youtubeUrl: 'https://youtu.be/bt3PVXmKxnw',
            quiz: {
              questions: [
                {
                  q: 'How many core tables are in the demo dataset?',
                  choices: ['4', '6', '8'],
                  a: 1,
                },
                {
                  q: 'Which table links patients to their visits?',
                  choices: ['encounter', 'labs', 'location'],
                  a: 0,
                },
              ],
            },
            labTemplate: {
              starter: 'SELECT * FROM patient LIMIT 5;',
              language: 'sql',
            },
            xpReward: 100,
          },
          {
            slug: 'module-3-sql-statement-basics',
            title: 'Module 3 \u2013 SQL Statement Basics Using Generative AI',
            youtubeUrl: 'https://youtu.be/P9LMgEfUDsY',
            quiz: {
              questions: [
                {
                  q: 'Which clause specifies the table to query?',
                  choices: ['SELECT', 'FROM', 'WHERE'],
                  a: 1,
                },
                {
                  q: 'Generative AI can assist analysts by:',
                  choices: [
                    'writing SQL snippets',
                    'making coffee',
                    'managing networks',
                  ],
                  a: 0,
                },
              ],
            },
            labTemplate: {
              starter: 'SELECT first_name, last_name FROM patient;',
              language: 'sql',
            },
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
