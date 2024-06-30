// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0xF-LNcHwD10iG9-q_K2vKsRH2-etns4",
  authDomain: "mern-estate-21fa1.firebaseapp.com",
  projectId: "mern-estate-21fa1",
  storageBucket: "mern-estate-21fa1.appspot.com",
  messagingSenderId: "3662990359",
  appId: "1:3662990359:web:82effbbb9cc9a9dffbe052",
  measurementId: "G-NH7T4L12W6"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);