import { ref, onUnmounted } from "vue";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export function useProfile() {
  const userProfile = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const ALLOWED_FIELDS = ["displayName", "photoURL", "bio"];

  async function loadUserProfile(uid) {
    loading.value = true;
    error.value = null;
    try {
      const snap = await getDoc(doc(db, "users", uid));
      userProfile.value = snap.exists() ? snap.data() : null;
    } catch (err) {
      error.value = err.message || "Erreur lors du chargement du profil";
    } finally {
      loading.value = false;
    }
  }

  async function updateUserProfile(uid, data) {
    loading.value = true;
    error.value = null;
    try {
      const safeData = Object.fromEntries(
        Object.entries(data).filter(([key]) =>
          ALLOWED_FIELDS.includes(key)
        )
      );

      if (Object.keys(safeData).length === 0) return;

      await setDoc(doc(db, "users", uid), safeData, { merge: true });
      userProfile.value = { ...userProfile.value, ...safeData };
    } catch (err) {
      error.value = err.message || "Erreur lors de la mise à jour du profil";
      throw err;
    } finally {
      loading.value = false;
    }
  }

  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      loadUserProfile(user.uid);
    } else {
      userProfile.value = null;
    }
  });

  onUnmounted(() => unsubscribe());

  return {
    userProfile,
    loading,
    error,
    loadUserProfile,
    updateUserProfile,
  };
}
