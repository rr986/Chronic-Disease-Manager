import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './FirebaseConfig.js';

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);

export default db;
