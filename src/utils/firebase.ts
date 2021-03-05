import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}-default-rtdb.firebaseio.com/`,
  storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: '1058018246800',
  appId: '1:1058018246800:web:968086df2853ba69a71815',
  measurementId: 'G-F4HVQEFCLD'
}

export function loadFirebase() {
  function initFirebase(): void {
    if (!firebase.default.apps.length) {
      firebase.default.initializeApp(config)
    }
  }
  initFirebase()
  return firebase.default.database()
}
