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
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-green-700 to-green-900 text-white py-24 px-4 rounded-lg mb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">Master Healthcare Analytics</h1>
          <p className="text-xl mb-8 opacity-90">Learn SQL, BigQuery, and advanced analytics techniques with hands-on practice using real healthcare datasets.</p>
          {session ? (
            hasCourses && courses[0].lessons.length > 0 && (
              <Link href={`/learn/${courses[0].lessons[0].slug}`} 
                className="bg-white text-green-900 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                Start Learning
              </Link>
            )
          ) : (
            <Link href="/api/auth/signin?callbackUrl=/dashboard" 
              className="bg-white text-green-900 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors">
              Sign in to Start
            </Link>
          )}
        </div>
      </section>

      {hasCourses ? (
        <section className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Available Courses</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-3">{course.title}</h3>
                <p className="text-gray-600 mb-4">
                  {course.lessons.length} lessons
                </p>
                <Link 
                  href={`/courses/${course.slug}`}
                  className="text-green-700 font-medium hover:text-green-900 transition-colors"
                >
                  View Course →
                </Link>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <p className="text-center text-gray-600">No courses available yet.</p>
      )}
    </div>
  );
}