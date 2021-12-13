'use strict';

const admin = require('firebase-admin');
const { ref, set } = require('firebase/database');

const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.FIREBASE_PROJECTID}-default-rtdb.firebaseio.com`,
});

const database = admin.database();

const writeData = (path, payload) => set(ref(database, path), payload);

module.exports = {
  database,
  writeData,
};
