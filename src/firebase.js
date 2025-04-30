// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; // <-- Storage'ı buraya ekledik

// Firebase ayarların (bunlar sende hazırdı zaten)
const firebaseConfig = {
  apiKey: "AIzaSyCdLBJel2xZjYsvqklll-BbdJzyUxK5KJo",
  authDomain: "kodtepe2.firebaseapp.com",
  projectId: "kodtepe2",
  storageBucket: "kodtepe2.appspot.com", // <-- dikkat
  messagingSenderId: "833026371443",
  appId: "1:833026371443:web:5a923b12be0d0dadecdf06",
};

// Firebase başlat
const app = initializeApp(firebaseConfig);

// Kullanılacak servisler
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app); // <-- storage burada tanımlandı

export { db, auth, storage };
