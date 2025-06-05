import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: 'asc' },
  });
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Courses</h1>
      {courses.length ? (
        <ul className="space-y-2">
          {courses.map((c) => (
            <li key={c.id}>
              <Link href={`/courses/${c.slug}`} className="text-green-700 underline">
                {c.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No courses available yet.</p>
      )}
    </div>
  );
}
