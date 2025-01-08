'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function createSession(uid: string) {
  (await cookies()).set('user_session', uid, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24,
    path: '/',
  });

  redirect('/Browse');
}

export async function removeSession() {
  (await cookies()).delete('user_session');
  redirect('/');
}
