import { getSession } from './auth';

export async function requiresAdmin() {
  const session = await getSession();
  if (!session || session.user.role !== 'admin') {
    throw new Error('Unauthorized');
  }
}
