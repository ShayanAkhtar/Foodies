import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBp6ej_6BkDTCWWMvSW0Ij3ObSGKdoWIfc",
  authDomain: "project-login-384dc.firebaseapp.com",
  projectId: "project-login-384dc",
  storageBucket: "project-login-384dc.firebasestorage.app",
  messagingSenderId: "588251252665",
  appId: "1:588251252665:web:8ac972a3355cee51991868"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
