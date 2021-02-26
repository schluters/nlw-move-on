import { init } from 'next-firebase-auth';

const initAuth = () => {
  init({
    authPageURL: '/auth',
    appPageURL: '/',
    loginAPIEndpoint: '/api/login', // required
    logoutAPIEndpoint: '/api/logout', // required
    // Required in most cases.
    firebaseAdminInitConfig: {
      credential: {
        projectId: 'nlw-move-on',
        clientEmail: 'firebase-adminsdk-3rlot@nlw-move-on.iam.gserviceaccount.com',
        // The private key must not be accesssible on the client side.
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
      },
      databaseURL: 'https://nlw-move-on.firebaseapp.com',
    },
    firebaseClientInitConfig: {
      apiKey: 'AIzaSyAiR_FZpZ4OYuyDxbaomWgftWwPTR6rH7g',
      authDomain: 'nlw-move-on.firebaseapp.com',
      projectId: 'nlw-move-on',
      databaseURL: 'https://nlw-move-on.appspot.com',
      // storageBucket: 'nlw-move-on.appspot.com',
      // messagingSenderId: '714589765652',
      // appId: '1:714589765652:web:07dece89505f30c457e701',
      // measurementId: 'G-S8HF98JPHL',
    },
    cookies: {
      name: 'MoveOn', // required
      // Keys are required unless you set `signed` to `false`.
      // The keys cannot be accessible on the client side.
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
      overwrite: true,
      path: '/',
      sameSite: 'strict',
      secure: true, // set this to false in local (non-HTTPS) development
      signed: true,
    },
  })
}

export default initAuth
