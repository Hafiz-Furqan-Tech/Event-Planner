import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyD4lLDtw35rO48W63PsuZGxOzuF-c34x0k",
  authDomain: "my-first-project-d408e.firebaseapp.com",
  projectId: "my-first-project-d408e",
  storageBucket: "my-first-project-d408e.appspot.com",
  messagingSenderId: "602581528308",
  appId: "1:602581528308:web:bfeff525bf265e9af838a1",
  measurementId: "G-DQJDSYTNS8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage();
const storageRef = ref(storage);
const db = getFirestore(app);

export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  auth,
  signOut,
  collection,
  addDoc,
  db,
  storage,
  ref,
  getDownloadURL,
  uploadBytes,
  getDocs,
  doc,
  deleteDoc,
};
