// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "post-gram-da78a.firebaseapp.com",
  projectId: "post-gram-da78a",
  storageBucket: "post-gram-da78a.appspot.com",
  messagingSenderId: "203544739649",
  appId: "1:203544739649:web:2074bcab54c2cf65fb6bc0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);