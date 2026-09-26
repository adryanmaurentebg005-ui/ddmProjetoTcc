import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBKDPUja-w3A6KJwjfGW2Hi2ROvQysxw4k',
  authDomain: 'ddmmassa.firebaseapp.com',
  projectId: 'ddmmassa',
  storageBucket: 'ddmmassa.firebasestorage.app',
  messagingSenderId: '616424654135',
  appId: '1:616424654135:web:76494898f81958356a06b2',
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

