import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
  orderBy,
} from "firebase/firestore";

// Your web app's Firebase configuration
// Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB9URO-J0DkQxR7GpzD61w6S_c7IkFavf4",
  authDomain: "ramvishwas-demo.firebaseapp.com",
  projectId: "ramvishwas-demo",
  storageBucket: "ramvishwas-demo.firebasestorage.app",
  messagingSenderId: "1080292762257",
  appId: "1:1080292762257:web:991a1359fa77c084a35530",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
  app,
  db,
  collection,
  doc,
  setDoc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
  orderBy,
};
