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
            description: `Unlock the Power of SQL & BigQuery in Healthcare Analytics — Module 1

What is the world is SQL and why should I care!

Ready to move beyond spreadsheets and front-end exports? In this kickoff module of our Advanced Analytics in Healthcare series, we break down what SQL is, why it matters, and how Google BigQuery turns raw EHR, claims, lab, and wearable data into lightning-fast insights.

What you'll learn
- Why SQL is still the analyst's "Swiss-army knife" for direct, stable access to enterprise data
- BigQuery essentials—serverless scale, real-time speed, and zero-ops management

Who this is for
- Hospital and payer analysts, informatics teams, data stewards, and anyone ready to level-up from basic dashboards to enterprise-grade analytics.
`,
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
            description: `Welcome to Module 2 — Intro to a Healthcare Dataset. We'll explore a realistic, de-identified hospital database in BigQuery and cover data foundations, the patient journey, six core tables, and best practices for querying hospital data at scale.`,
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
            description: `Module 3 breaks down the SELECT, FROM, JOIN, and WHERE clauses using BigQuery and Generative AI. See real-world examples with hospital data and learn prompt engineering techniques to boost your analytics workflow.`,
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
