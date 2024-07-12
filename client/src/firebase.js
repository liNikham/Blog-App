// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-d2a7c.firebaseapp.com",
  projectId: "mern-blog-d2a7c",
  storageBucket: "mern-blog-d2a7c.appspot.com",
  messagingSenderId: "797091307042",
  appId: "1:797091307042:web:6ac2314141d15ad5ceb47b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
