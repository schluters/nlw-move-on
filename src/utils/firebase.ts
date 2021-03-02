import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}-default-rtdb.firebaseio.com/`,
  storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: '714589765652',
  appId: '1:714589765652:web:07dece89505f30c457e701',
  measurementId: 'G-S8HF98JPHL',
};

export function loadFirebase() {
  function initFirebase() {
    if (!firebase.default.apps.length) {
      firebase.default.initializeApp(config);
    }
  }
  initFirebase();
  return firebase.default.database();
}
