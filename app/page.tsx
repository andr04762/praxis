import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function Home() {
  const session = await getServerSession(authOptions);
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: 'asc' },
    include: { lessons: { orderBy: { createdAt: 'asc' } } },
  });
  const hasCourses = courses.length > 0;

  return (
    <div>
      <section className="bg-green-700 text-white text-center py-20 rounded mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Prax</h1>
        <p className="mb-6">Learn healthcare data analytics with bite-sized lessons.</p>
        {session ? (
          hasCourses && courses[0].lessons.length > 0 && (
            <Link href={`/learn/${courses[0].lessons[0].slug}`} className="btn">
              Start Learning
            </Link>
          )
        ) : (
          <Link href="/api/auth/signin?callbackUrl=/dashboard" className="btn">
            Sign in to start
          </Link>
        )}
      </section>
      {hasCourses ? (
        <section>
          <h2 className="text-xl font-semibold mb-4">Available Courses</h2>
          <ul className="space-y-4">
            {courses.map((c) => (
              <li key={c.id} className="mb-2">
                <Link href={`/courses/${c.slug}`} className="text-green-700 underline">
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <p className="text-center text-gray-600">No courses available yet.</p>
      )}
    </div>
  );
}