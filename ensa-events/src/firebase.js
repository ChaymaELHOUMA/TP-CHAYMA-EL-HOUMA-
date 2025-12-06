import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAnpmSAV_DHgUjVywIGoAjwPVW57cLg-Ow",
  authDomain: "ensa-events-63464.firebaseapp.com",
  projectId: "ensa-events-63464",
  storageBucket: "ensa-events-63464.appspot.com",
  messagingSenderId: "779947857526",
  appId: "1:779947857526:web:db4f02908fb2e19259f157",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const firebaseApp = app;
