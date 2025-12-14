<template>
  <b-form @submit.prevent="submitResponse">
    <b-form-textarea
      v-model="content"
      placeholder="Écrire une réponse..."
      rows="3"
      required
      maxlength="1000"
    />
    <b-button type="submit" variant="success" :disabled="loading">{{ loading ? "Envoi..." : "Répondre" }}</b-button>
  </b-form>
</template>

<script setup>
import { ref } from "vue";
import { useAuth } from "../composables/useAuth";

const emit = defineEmits(["submit"]);

const content = ref("");
const loading = ref(false);
const { user } = useAuth();

async function submitResponse() {
  if (!user.value) {
    alert("Connectez-vous pour répondre.");
    return;
  }
  if (!content.value.trim()) {
    alert("La réponse ne peut pas être vide.");
    return;
  }
  loading.value = true;
  await emit("submit", content.value);
  content.value = "";
  loading.value = false;
}
</script>
