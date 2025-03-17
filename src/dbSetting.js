// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCdLBJel2xZjYsvqklll-BbdJzyUxK5KJo",
  authDomain: "kodtepe2.firebaseapp.com",
  projectId: "kodtepe2",
  storageBucket: "kodtepe2.firebasestorage.app",
  messagingSenderId: "833026371443",
  appId: "1:833026371443:web:5a923b12be0d0dadecdf06",
  measurementId: "G-G4B9L9HNK6",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
