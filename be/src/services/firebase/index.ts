import firebase, { ServiceAccount } from 'firebase-admin';
import credentials from '../../../pricetracker-8da04-firebase-adminsdk-w3rnr-d71d5ac377.json';

const serviceAccount = credentials as ServiceAccount;

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://pricetracker-8da04.firebaseio.com',
});

const db = firebase.firestore();

const priceRef = db.collection('Prices');

export { db, priceRef };
