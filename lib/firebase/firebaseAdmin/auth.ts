import admin from 'firebase-admin';
import path from 'path';

const serviceAccount = path.join(process.cwd(), 'lib/firebase/music-app-cd5ac-firebase-adminsdk-gjhw0-3b8d684838.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const auth = admin.auth();
