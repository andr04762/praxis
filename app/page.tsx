import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export default async function Home() {
  const session = await getSession();
  const lessons = await prisma.lesson.findMany({ orderBy: { createdAt: 'asc' } });
  const hasLessons = lessons.length > 0;

  return (
    <div>
      <section className="bg-green-700 text-white text-center py-20 rounded mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Prax</h1>
        <p className="mb-6">Learn healthcare data analytics with bite-sized lessons.</p>
        {session ? (
          hasLessons && (
            <Link href={`/learn/${lessons[0].slug}`} className="btn">
              Start Learning
            </Link>
          )
        ) : (
          <Link href="/api/auth/signin" className="btn">
            Sign in to start
          </Link>
        )}
      </section>
      {hasLessons ? (
        <section>
          <h2 className="text-xl font-semibold mb-4">Available Lessons</h2>
          <ul className="space-y-2">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {lessons.map((l: any, i: number) => (
              <li key={l.id} className="mb-2">
                <Link href={`/learn/${l.slug}`} className="text-green-700 underline">
                  {i + 1}. {l.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <p className="text-center text-gray-600">No lessons available yet.</p>
      )}
    </div>
  );
}
