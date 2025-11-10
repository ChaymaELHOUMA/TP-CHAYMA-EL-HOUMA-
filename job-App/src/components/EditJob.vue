<template>
  <div>
    <h2>Modifier l'emploi</h2>

    <form @submit.prevent="updateJob">
      <input v-model="job.title"><br>
      <input v-model="job.company"><br>
      <input v-model="job.salary" type="number"><br>
      <input v-model="job.experience" placeholder="Expérience (années)"><br>
      <textarea v-model="job.description"></textarea><br>

      <button>Enregistrer</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const job = ref({})

onMounted(async () => {
  const res = await fetch(`http://localhost:3000/jobs/${route.params.id}`)
  job.value = await res.json()
})

const updateJob = async () => {
  await fetch(`http://localhost:3000/jobs/${route.params.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(job.value)
  })
  router.push('/')
}
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
