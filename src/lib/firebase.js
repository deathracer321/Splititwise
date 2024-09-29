// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJDOW6LcsrcI93NLwGlB1rUCMWwzjuF90",
  authDomain: "splititwise-40726.firebaseapp.com",
  projectId: "splititwise-40726",
  storageBucket: "splititwise-40726.appspot.com",
  messagingSenderId: "215575311978",
  appId: "1:215575311978:web:3a49bd17fcfe1baa0e3c13",
  measurementId: "G-K4EG86C8ZJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the Firebase Realtime Database instance
const database = getDatabase(app);

export { database };
