<template>
  <div class="container d-flex justify-content-center align-items-center" style="min-height: 80vh;">
    <b-card style="max-width: 400px; width: 100%;">
      <h3 class="mb-4 text-center">Connexion</h3>

      <b-alert variant="danger" v-if="error" dismissible @dismissed="error = ''">
        {{ error }}
      </b-alert>

      <b-form @submit.prevent="handleLogin">
        <b-form-group label="Email" label-for="emailInput">
          <b-form-input
            id="emailInput"
            type="email"
            v-model="email"
            required
            placeholder="Entrez votre email"
            autocomplete="username"
          />
        </b-form-group>

        <b-form-group label="Mot de passe" label-for="passwordInput">
          <b-form-input
            id="passwordInput"
            type="password"
            v-model="password"
            required
            placeholder="Entrez votre mot de passe"
            autocomplete="current-password"
          />
        </b-form-group>

        <b-button type="submit" variant="primary" class="w-100" :disabled="loading">
          {{ loading ? "Connexion..." : "Se connecter" }}
        </b-button>
      </b-form>

      <div class="mt-3 text-center">
        <router-link to="/register">Créer un compte</router-link> |
        <router-link to="/reset-password">Mot de passe oublié ?</router-link>
      </div>
    </b-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";

const email = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);

const router = useRouter();
const { login } = useAuth();

async function handleLogin() {
  error.value = "";
  loading.value = true;
  try {
    await login(email.value, password.value);
    router.push({ name: "Home" });
  } catch (err) {
    error.value = err.message || "Erreur lors de la connexion.";
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.container {
  max-width: 100%;
}
</style>
