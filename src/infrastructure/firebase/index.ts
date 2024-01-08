import * as admin from 'firebase-admin';

import { jsonConfig, DB_URL, BUCKET_NAME } from '../../config/keys';
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(jsonConfig),
    databaseURL: DB_URL,
    storageBucket: BUCKET_NAME
  });
}

export const db = admin.firestore();
export const bucket = admin.storage().bucket();
