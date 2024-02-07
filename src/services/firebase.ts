// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.API_KEY,
  authDomain: 'pricetracker-8da04.firebaseapp.com',
  projectId: 'pricetracker-8da04',
  storageBucket: 'pricetracker-8da04.appspot.com',
  messagingSenderId: '710381490793',
  appId: '1:710381490793:web:e2a35e82d64d48eb1d88f8',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
