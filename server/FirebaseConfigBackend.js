import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_KEY,
  authDomain: process.env.VITE_FIREBASE_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
// Get Firestore instance
const db = getFirestore(app);

export default db;
