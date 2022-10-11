import {initializeApp} from 'firebase/app';
import {getAuth, connectAuthEmulator} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBb37iMuCNyyqlIyJz70Hock0Ql0HayHOU',
  authDomain: 'react-firebase-auth-97165.firebaseapp.com',
  projectId: 'react-firebase-auth-97165',
  storageBucket: 'react-firebase-auth-97165.appspot.com',
  messagingSenderId: '216487634476',
  appId: '1:216487634476:web:d2362e8ac18f4895e71389',
  measurementId: 'G-2S3KCJ593H',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
