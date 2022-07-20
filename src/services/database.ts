import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';

import DEFAULT_DATA from '../data.json';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: `${process.env.REACT_APP_FIREBASE_PROJECTID}.firebaseapp.com`,
  databaseURL: `https://${process.env.REACT_APP_FIREBASE_PROJECTID}-default-rtdb.firebaseio.com`,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: `${process.env.REACT_APP_FIREBASE_PROJECTID}.appspot.com`,
  messagingSenderId: '113712430862',
  appId: '1:113712430862:web:648f1afade10eeb0db615f',
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);

export const getPublicData = async () => {
  const snapshot = await get(ref(database, 'public'));
  if (process.env.REACT_APP_ENV === 'development' || !snapshot.exists()) {
    return DEFAULT_DATA.public;
  }

  return snapshot.val();
};
