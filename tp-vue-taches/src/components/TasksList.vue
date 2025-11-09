<template>
  <div class="tasklist">

    <div class="filters">
      <button :class="{ active: filter === 'all' }" @click="filter = 'all'">Toutes</button>
      <button :class="{ active: filter === 'todo' }" @click="filter = 'todo'">À faire</button>
      <button :class="{ active: filter === 'done' }" @click="filter = 'done'">Terminées</button>
    </div>

    <p><strong>Total tâches :</strong> {{ totalTasks }}</p>

    <ul>
      <li v-for="task in filteredTasks" :key="task.id">
        <h3 :class="{ completed: task.completed }">{{ task.title }}</h3>
        <p>{{ task.description }}</p>

        <button v-show="!task.completed" @click="markCompleted(task.id)">
          Marquer comme terminée
        </button>

        <span v-if="task.completed" class="done">✅ Terminée</span>
      </li>
    </ul>

  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";

export default {
  setup() {
    const tasks = ref([]);
    const filter = ref("all");

    const loadTasks = async () => {
      const response = await fetch("/tasks.json");
      tasks.value = await response.json();
    };

    const markCompleted = (id) => {
      const t = tasks.value.find(task => task.id === id);
      if (t) t.completed = true;
    };

    const totalTasks = computed(() => tasks.value.length);

    const filteredTasks = computed(() => {
      if (filter.value === "todo") return tasks.value.filter(t => !t.completed);
      if (filter.value === "done") return tasks.value.filter(t => t.completed);
      return tasks.value;
    });

    onMounted(loadTasks);

    return { tasks, filter, markCompleted, totalTasks, filteredTasks };
  }
};
</script>

<style scoped>
.tasklist {
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0,0,0,0.05);
  margin-top: 20px;
}

/* Boutons de filtre */
.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.filters button {
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  background: #e8ecf5;
  cursor: pointer;
  font-weight: 500;
  transition: 0.25s;
}

.filters button:hover {
  background: #d5def0;
}

.filters .active {
  background: #1f3c88;
  color: white;
}

/* Liste des tâches */
ul {
  list-style: none;
  margin-top: 10px;
}

li {
  padding: 14px 12px;
  border-bottom: 1px solid #e9e9e9;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* Texte */
h3 {
  margin-bottom: 5px;
  font-size: 1.05rem;
  font-weight: 600;
}

.completed {
  text-decoration: line-through;
  color: #9a9a9a;
}

/* Bouton marquer comme terminée */
button {
  padding: 6px 12px;
  border: none;
  background: #4f8cff;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.25s;
  font-size: 0.9rem;
}

button:hover {
  background: #306ee0;
}

/* Label terminé */
.done {
  font-weight: 600;
  color: #1aa155;
  font-size: 0.95rem;
}
</style>

