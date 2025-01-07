import admin from 'firebase-admin';
import path from 'path';


if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({}),
  });
}

export const auth = admin.auth();
