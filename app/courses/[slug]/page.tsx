import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await prisma.course.findUnique({
    where: { slug },
    include: { lessons: { orderBy: { createdAt: 'asc' } } },
  });
  if (!course) redirect('/');
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">{course.title}</h1>
      <ul className="space-y-2 list-decimal list-inside">
        {course.lessons.map((l, i) => (
          <li key={l.id}>
            <Link href={`/learn/${l.slug}`} className="text-green-700 underline">
              {i + 1}. {l.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
