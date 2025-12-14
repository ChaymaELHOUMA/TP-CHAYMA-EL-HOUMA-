import { ref } from "vue";
import { auth } from "../firebase"; 
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";

const user = ref(null);
const loading = ref(true);
const error = ref(null);

onAuthStateChanged(auth, (firebaseUser) => {
  user.value = firebaseUser ? firebaseUser : null;
  clearError();
  loading.value = false;
});

function clearError() {
  error.value = null;
}

async function login(email, password) {
  clearError();
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    handleFirebaseError(e);
    throw e;
  }
}

async function register(email, password, displayName = null) {
  clearError();
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    if (res.user && displayName) {
      await updateProfile(res.user, { displayName });
      user.value = auth.currentUser;
    } else if (res.user) {
      user.value = res.user;
    }
  } catch (e) {
    handleFirebaseError(e);
    throw e;
  }
}

async function logout() {
  clearError();
  try {
    await signOut(auth);
    user.value = null;
  } catch (e) {
    handleFirebaseError(e);
    throw e;
  }
}

async function resetPassword(email) {
  clearError();
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (e) {
    handleFirebaseError(e);
    throw e;
  }
}

function handleFirebaseError(e) {
  switch (e.code) {
    case "auth/email-already-in-use":
      error.value = "Cet email est déjà utilisé.";
      break;
    case "auth/invalid-email":
      error.value = "L'adresse email n'est pas valide.";
      break;
    case "auth/weak-password":
      error.value = "Le mot de passe est trop faible (6 caractères minimum).";
      break;
    case "auth/user-not-found":
      error.value = "Utilisateur non trouvé.";
      break;
    case "auth/wrong-password":
      error.value = "Mot de passe incorrect.";
      break;
    default:
      error.value = e.message || "Une erreur est survenue.";
  }
}

export function useAuth() {
  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    resetPassword,
  };
}
