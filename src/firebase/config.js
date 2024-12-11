import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyB20z-7Ee4G4bo3-uKtvr94rd-tsmQDKys",
  authDomain: "book-list-with-firebase-ab44f.firebaseapp.com",
  projectId: "book-list-with-firebase-ab44f",
  storageBucket: "book-list-with-firebase-ab44f.firebasestorage.app",
  messagingSenderId: "637159665621",
  appId: "1:637159665621:web:69e2ae5a6ba52c0860975c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);