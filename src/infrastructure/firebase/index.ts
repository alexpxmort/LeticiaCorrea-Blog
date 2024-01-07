import * as admin from 'firebase-admin';

import { jsonConfig, DB_URL } from '../../config/keys';
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(jsonConfig),
    databaseURL: DB_URL
  });
}

export const db = admin.firestore();
