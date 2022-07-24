import * as admin from 'firebase-admin';

import serviceAccount from '../serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: `https://${serviceAccount.project_id}-default-rtdb.firebaseio.com`,
});

const db = admin.database();

export const getData = async (path: string) => {
  const ref = db.ref(path);

  const snapshot = await ref.get();

  return snapshot.val();
};

export const writeData = async (path: string, value: any) => db.ref(path).set(value);
