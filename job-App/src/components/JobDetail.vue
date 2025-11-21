<template>
  <div v-if="job">
    <h2>{{ job.title }}</h2>
    <p><strong>Entreprise:</strong> {{ job.company }}</p>
    <p><strong>Salaire:</strong> {{ job.salary }} DH</p>
     <p><strong>Expérience:</strong> {{ job.experience }}</p>
    <p><strong>Description:</strong> {{ job.description }}</p>
    
    <button @click="router.back()">Retour</button>
  </div>

  <div v-else>
    Chargement...
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const job = ref(null)
const route = useRoute()
const router = useRouter()

onMounted(async () => {
  const res = await fetch(`http://localhost:3000/jobs/${route.params.id}`)
  job.value = await res.json()
})
</script>

<style scoped>
div {
  padding: 20px;
  max-width: 500px;
  margin: auto;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
h2 {
  text-align: center;
}
button {
  width: 100%;
  margin-top: 10px;
}
</style>
