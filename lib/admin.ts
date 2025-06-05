import { getServerSession } from 'next-auth';
import { authOptions } from './auth';

export async function requiresAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    throw new Error('Unauthorized');
  }
}