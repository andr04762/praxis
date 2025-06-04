import { requiresAdmin } from '@/lib/admin';
import { prisma } from '@/lib/prisma';

export default async function AdminPage() {
  await requiresAdmin();
  const [users, lessons, progress] = await Promise.all([
    prisma.user.count(),
    prisma.lesson.count(),
    prisma.progress.findMany(),
  ]);
  const mau = await prisma.session.count({ where: { expires: { gte: new Date(Date.now() - 30*24*3600*1000) } } });
  const conversions = progress.filter(p => p.xpEarned > 0).length / progress.length || 0;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="border p-4">Users: {users}</div>
        <div className="border p-4">MAU: {mau}</div>
        <div className="border p-4">Lessons: {lessons}</div>
        <div className="border p-4">Conversion: {(conversions * 100).toFixed(1)}%</div>
      </div>
    </div>
  );
}
