// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase ayarlarını buraya yaz (değiştirmen gerekiyorsa!)
const firebaseConfig = {
  apiKey: "AIzaSyCdLBJel2xZjYsvqklll-BbdJzyUxK5KJo",
  authDomain: "kodtepe2.firebaseapp.com",
  projectId: "kodtepe2",
  storageBucket: "kodtepe2.appspot.com", // düzeltme
  messagingSenderId: "833026371443",
  appId: "1:833026371443:web:5a923b12be0d0dadecdf06"
};

// Firebase başlat
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
