<template>
  <b-card class="mb-4">
    <h3>Créer une nouvelle discussion</h3>
    <b-form @submit.prevent="handleSubmit">
      <b-form-group label="Titre">
        <b-form-input v-model="title" required maxlength="100" placeholder="Titre clair" />
      </b-form-group>

      <b-form-group label="Catégorie">
        <b-form-select v-model="category" :options="categories" required />
      </b-form-group>

      <b-form-group label="Contenu">
        <b-form-textarea v-model="content" rows="5" required maxlength="2000" placeholder="Décrivez votre sujet..." />
      </b-form-group>

      <b-button type="submit" variant="primary" :disabled="loading">
        {{ loading ? "Création..." : "Créer la discussion" }}
      </b-button>
    </b-form>
    <b-alert v-if="error" variant="danger" dismissible @dismissed="error=''">{{ error }}</b-alert>
    <b-alert v-if="success" variant="success" dismissible @dismissed="success=''">{{ success }}</b-alert>
  </b-card>
</template>

<script setup>
import { ref } from "vue";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../composables/useAuth";

const { user } = useAuth();

const title = ref("");
const category = ref(null);
const content = ref("");
const loading = ref(false);
const error = ref("");
const success = ref("");

const categories = [
  { value: null, text: "Choisissez une catégorie", disabled: true },
  { value: "general", text: "Général" },
  { value: "questions", text: "Questions" },
  { value: "ideas", text: "Idées" },
];

async function handleSubmit() {
  if (!user.value) {
    error.value = "Vous devez être connecté pour créer une discussion.";
    return;
  }
  if (!title.value.trim() || !content.value.trim() || !category.value) {
    error.value = "Tous les champs sont obligatoires.";
    return;
  }
  loading.value = true;
  error.value = "";
  try {
    await addDoc(collection(db, "discussions"), {
      title: title.value.trim(),
      category: category.value,
      content: content.value.trim(),
      authorId: user.value.uid,
      authorName: user.value.displayName || user.value.email,
      createdAt: serverTimestamp(),
    });
    success.value = "Discussion créée avec succès.";
    title.value = "";
    content.value = "";
    category.value = null;
  } catch (e) {
    error.value = "Erreur: " + e.message;
  } finally {
    loading.value = false;
  }
}
</script>
