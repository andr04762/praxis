import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { levelFromXp } from '@/lib/level';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/api/auth/signin');

  const [progress, courses] = await Promise.all([
    prisma.progress.findMany({
      where: { userId: session.user.id },
    }),
    prisma.course.findMany({
      orderBy: { createdAt: 'asc' },
    }),
  ]);

  const totalXp = progress.reduce((sum, p) => sum + p.xpEarned, 0);
  const level = levelFromXp(totalXp);

  return (
    <div className="flex">
      <aside className="w-48 mr-6 shrink-0">
        <nav>
          <h2 className="font-semibold mb-2">Courses</h2>
          <ul className="space-y-2">
            {courses.map((c) => (
              <li key={c.id}>
                <Link href={`/courses/${c.slug}`} className="text-green-700 underline">
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
          {courses.length === 0 && (
            <p className="text-gray-500">No courses available yet.</p>
          )}
        </nav>
      </aside>
      <div className="flex-1">
        <h1 className="text-xl font-bold mb-4">Welcome back{session.user.name ? `, ${session.user.name}` : ''}!</h1>
        <p className="mb-4">XP: {totalXp} (Level {level})</p>
      </div>
    </div>
  );
}