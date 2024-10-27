// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBq66a3boLKx2o4nTbWX4y_Ho6bG6IopW8",
  authDomain: "eicher-app-2c931.firebaseapp.com",
  projectId: "eicher-app-2c931",
  storageBucket: "eicher-app-2c931.appspot.com",
  messagingSenderId: "735561156602",
  appId: "1:735561156602:web:486e9312b0eae831f1c643",
  measurementId: "G-35QDFSWV50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
