import { prisma } from '../lib/prisma';

async function main() {
  const lessons = [
    {
      slug: 'intro-sql',
      title: 'Intro to SQL',
      youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      quiz: { questions: [{ q: 'What does SQL stand for?', a: 0, choices: ['Structured Query Language', 'Simple Query Link'] }] },
      xpReward: 100,
    },
    {
      slug: 'joins',
      title: 'SQL Joins',
      youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      quiz: { questions: [{ q: 'Which join returns all rows?', a: 2, choices: ['INNER', 'LEFT', 'FULL'] }] },
      xpReward: 150,
    },
    {
      slug: 'agg',
      title: 'Aggregations',
      youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      quiz: { questions: [{ q: 'COUNT(*) returns?', a: 0, choices: ['number of rows', 'sum'] }] },
      xpReward: 200,
    },
  ];
  for (const l of lessons) {
    await prisma.lesson.upsert({ where: { slug: l.slug }, update: {}, create: l });
  }
  if (process.env.ADMIN_EMAIL) {
    await prisma.user.upsert({ where: { email: process.env.ADMIN_EMAIL }, update: { role: 'admin' }, create: { email: process.env.ADMIN_EMAIL, role: 'admin' } });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
