import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import getFirestore


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5fV4Gi_nDB-qBCdwyzO9gLMK1yyiknRc",
  authDomain: "endorse-app.firebaseapp.com",
  projectId: "endorse-app",
  storageBucket: "endorse-app.firebasestorage.app",
  messagingSenderId: "661681554342",
  appId: "1:661681554342:web:4ffbbe1751bfdca15cc567",
  measurementId: "G-RP8XHE1RXG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);