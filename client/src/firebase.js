// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "debugify-2438e.firebaseapp.com",
  projectId: "debugify-2438e",
  storageBucket: "debugify-2438e.appspot.com",
  messagingSenderId: "861556020410",
  appId: "1:861556020410:web:e4ff71d37bd11ea2ff5e83"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);