
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAuRPvq7sZbKhGFzVURilr7DCvKPguMlc8",
  authDomain: "forum-56067.firebaseapp.com",
  projectId: "forum-56067",
  storageBucket: "forum-56067.appspot.com", 
  messagingSenderId: "725269195040",
  appId: "1:725269195040:web:ec20d30cf262b32c9c0f45"
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export { app, auth, db, storage };
