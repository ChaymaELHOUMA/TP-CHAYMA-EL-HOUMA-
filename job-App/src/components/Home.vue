<template>
  <div class="container">

    <h1 class="title">Liste des Emplois</h1>

    <FilterNav @filter-change="updateFilters" />

    <button class="add-btn" @click="router.push('/add')">+ Ajouter un Emploi</button>

    <div class="job-list">
      <div v-for="job in filteredJobs" :key="job.id" class="job-card">
        <h3>{{ job.title }}</h3>
        <p>{{ job.description }}</p>
        <p><strong>Salaire :</strong> {{ job.salary }} DH</p>
        <p><strong>Expérience :</strong> {{ job.experience }} ans</p>

        <div class="btn-group">
          <button @click="router.push(`/job/${job.id}`)">Détails</button>
          <button @click="router.push(`/edit/${job.id}`)">Modifier</button>
          <button class="delete" @click="deleteJob(job.id)">Supprimer</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import FilterNav from '../components/FilterNav.vue'

const router = useRouter()
const jobs = ref([])


const filters = ref({
  title: '',
  minSalary: null,
  minExperience: null
})

const updateFilters = (newFilters) => {
  filters.value = newFilters
}

const fetchJobs = async () => {
  const res = await fetch('http://localhost:3000/jobs')
  jobs.value = await res.json()
}
onMounted(fetchJobs)

const filteredJobs = computed(() => {
  return jobs.value.filter(job => {
    return (
      (filters.value.title === '' || job.title.toLowerCase().includes(filters.value.title.toLowerCase())) &&
      (filters.value.minSalary === null || job.salary >= filters.value.minSalary) &&
      (filters.value.minExperience === null || job.experience >= filters.value.minExperience)
    )
  })
})

const deleteJob = async (id) => {
  if (confirm('Supprimer cet emploi ?')) {
    await fetch(`http://localhost:3000/jobs/${id}`, { method: 'DELETE' })
    fetchJobs()
  }
}
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: auto;
  padding: 20px;
}

.title {
  text-align: center;
  margin-bottom: 15px;
  font-size: 26px;
  font-weight: bold;
}

.add-btn {
  display: block;
  margin: 10px auto 25px;
  background: rgba(67, 59, 138, 1);
  color: white;
  border: none;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
}
.add-btn:hover {
  background: rgba(67, 59, 138, 1);
}


.job-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
}


.job-card {
  background: white;
  border-radius: 10px;
  padding: 18px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
}

.job-card h3 {
  margin-top: 0;
}


.btn-group button {
  margin-right: 8px;
  padding: 6px 10px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.delete {
  background: rgb(37, 99, 235);
  color: white;
}
.delete:hover {
  background:rgb(37, 99, 235);
}
</style>




