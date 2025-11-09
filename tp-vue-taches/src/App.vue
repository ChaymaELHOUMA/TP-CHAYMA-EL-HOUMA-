<template>
  <div class="app-container">
    <h1>TP DBJS - Gestion de tâches</h1>
    <TasksList />
  </div>
</template>

<script>
import TasksList from './components/TasksList.vue'

export default {
  components: { TasksList }
}
</script>

<style>
.app-container {
  max-width: 900px;
  margin: 30px auto;
  font-family: Arial, sans-serif;
}
h1 {
  text-align: center;
}
</style>
