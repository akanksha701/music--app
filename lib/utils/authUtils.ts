import { auth } from '@/lib/firebase/firebaseAdmin/auth';

export async function verifyToken(req: Request) {
  try {
    const authHeader: string|null = req.headers.get('Authorization');
    const token = authHeader?.split(' ')[1];
    const decodedToken = await auth.verifyIdToken(token as string);

    const user = await auth.getUser(decodedToken.uid);

    return { decodedToken, user };
  } catch (error) {
    throw new Error('Authentication failed: ' + error);
  }
}
