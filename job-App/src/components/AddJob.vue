<template>
  <div class="add-job-page">
    <h2>Ajouter un Emploi</h2>

    <form @submit.prevent="addJob" class="job-form">
      <input v-model="title" placeholder="Titre de l'emploi" required />
      <input v-model="company" placeholder="Entreprise" required />
      <input v-model="salary" type="number" placeholder="Salaire (DH)" min="0" required />
      <textarea v-model="description" placeholder="Description" rows="4" required></textarea>

      <div class="button-row">
        <button type="submit" class="add-btn">Ajouter</button>
        <button type="button" class="back-btn" @click="router.push('/')">Retour</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const title = ref('')
const company = ref('')
const salary = ref('')
const description = ref('')

const addJob = async () => {
  await fetch('http://localhost:3000/jobs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: title.value,
      company: company.value,
      description: description.value,
      salary: salary.value
    })
  })
  router.push('/')
}
</script>

<style scoped>
.add-job-page {
  max-width: 600px;
  margin: 40px auto;
  padding: 25px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
}

h2 {
  text-align: center;
  margin-bottom: 25px;
}

.job-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.job-form input,
.job-form textarea {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
}


.button-row {
  display: flex;
  gap: 10px;
}

.add-btn,
.back-btn {
  flex: 1; 
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  color: white;
  transition: 0.2s;
}

.add-btn {
  background: #2563eb;
}

.add-btn:hover {
  background: #1e40af;
}

.back-btn {
  background: #1e40af;
}

.back-btn:hover {
  background: #1e40af;
}
</style>







