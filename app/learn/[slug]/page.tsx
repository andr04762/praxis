import { prisma } from '@/lib/prisma';
import { Quiz } from '@/components/Quiz';
import { AskAI } from '@/components/AskAI';
import { Lab, type LabTemplate } from '@/components/Lab';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
export default async function LearnPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const session = await getSession();
  const lesson = await prisma.lesson.findUnique({ where: { slug } });
  if (!lesson) redirect('/');
  const progress = session
    ? await prisma.progress.upsert({
        where: { userId_lessonId: { userId: session.user.id, lessonId: lesson.id } },
        create: { userId: session.user.id, lessonId: lesson.id },
        update: {},
      })
    : null;
  const passed = progress?.completed ?? false;
  return (
    <div>
      <h1 className="text-xl font-bold mb-2">{lesson.title}</h1>
      <iframe className="w-full aspect-video mb-4" src={lesson.youtubeUrl} />
      {!passed && lesson.quiz && (
        <Quiz
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          questions={(lesson.quiz as any).questions}
          onPass={async () => {
            'use server';
            if (!session) return;
            await prisma.progress.update({
              where: { id: progress!.id },
              data: { completed: true, xpEarned: lesson.xpReward },
            });
          }}
        />
      )}
      <div className="mt-4">
        <AskAI />
      </div>
      {lesson.labTemplate && (
        <Lab
          template={lesson.labTemplate as unknown as LabTemplate}
          onComplete={() => {}}
        />
      )}
    </div>
  );
}
