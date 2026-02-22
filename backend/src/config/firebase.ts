import * as admin from 'firebase-admin';
import { env } from './env';

try {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: env.FIREBASE_PROJECT_ID,
      clientEmail: env.FIREBASE_CLIENT_EMAIL,
      privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
  console.log('Firebase Admin SDK initialisé avec succès');
} catch (error) {
  console.error('Erreur lors de l\'initialisation de Firebase Admin SDK:', error);
}

export default admin;
