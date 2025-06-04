import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function Home() {
  const lessons = await prisma.lesson.findMany({ orderBy: { createdAt: 'asc' } });
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to Prax</h1>
      <ul>
        {lessons.map((l, i) => (
          <li key={l.id} className="mb-2">
            <Link href={`/learn/${l.slug}`} className="text-accent underline">
              {i + 1}. {l.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
