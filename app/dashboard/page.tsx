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
      include: { lesson: true },
    }),
    prisma.course.findMany({
      orderBy: { createdAt: 'asc' },
      include: { lessons: true },
    }),
  ]);

  const totalXp = progress.reduce((sum, p) => sum + p.xpEarned, 0);
  const level = levelFromXp(totalXp);
  const completedLessons = progress.filter(p => p.completed).length;
  const totalLessons = courses.reduce((sum, c) => sum + c.lessons.length, 0);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
        <h1 className="text-2xl font-bold mb-6">Welcome back{session.user.name ? `, ${session.user.name}` : ''}!</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-green-50 rounded-lg p-6">
            <div className="text-4xl font-bold text-green-700 mb-2">{level}</div>
            <div className="text-gray-600">Current Level</div>
          </div>
          <div className="bg-green-50 rounded-lg p-6">
            <div className="text-4xl font-bold text-green-700 mb-2">{totalXp}</div>
            <div className="text-gray-600">Total XP</div>
          </div>
          <div className="bg-green-50 rounded-lg p-6">
            <div className="text-4xl font-bold text-green-700 mb-2">
              {completedLessons}/{totalLessons}
            </div>
            <div className="text-gray-600">Lessons Completed</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <nav className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Your Courses</h2>
            <ul className="space-y-3">
              {courses.map((c) => (
                <li key={c.id}>
                  <Link 
                    href={`/courses/${c.slug}`}
                    className="text-green-700 hover:text-green-900 transition-colors"
                  >
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

        <div className="md:col-span-3">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Recent Progress</h2>
            {progress.length > 0 ? (
              <ul className="space-y-4">
                {progress.map(p => (
                  <li key={p.id} className="border-b pb-4 last:border-0">
                    <Link 
                      href={`/learn/${p.lesson.slug}`}
                      className="text-green-700 hover:text-green-900 transition-colors"
                    >
                      {p.lesson.title}
                    </Link>
                    <div className="text-sm text-gray-500 mt-1">
                      {p.completed ? 'Completed' : 'In Progress'} • {p.xpEarned} XP earned
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Start a course to track your progress!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}