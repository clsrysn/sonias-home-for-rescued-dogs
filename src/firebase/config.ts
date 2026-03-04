import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCU7wW61KAlmcSdz1hXOWNURccAcoPLtX0",
  authDomain: "share-website-34675.firebaseapp.com",
  projectId: "share-website-34675",
  storageBucket: "share-website-34675.firebasestorage.app",
  messagingSenderId: "747449663894",
  appId: "1:747449663894:web:55d9e246961f2514909db7",
  measurementId: "G-KJF812ZGVQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
