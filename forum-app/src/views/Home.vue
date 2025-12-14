<template>
  <div class="container mt-4">
    <b-row class="mb-3 align-items-center">
      <b-col cols="12" md="6">
        <b-form-input
          v-model="searchTerm"
          placeholder="Rechercher une discussion..."
          @input="onSearch"
          clearable
        />
      </b-col>
      <b-col cols="12" md="6" class="text-md-end mt-2 mt-md-0">
        <b-form-select
          v-model="selectedCategory"
          :options="categoryOptions"
          @change="filterByCategory"
        />
      </b-col>
    </b-row>

    <b-button variant="primary" class="mb-3" @click="showNewDiscussionForm = !showNewDiscussionForm">
      {{ showNewDiscussionForm ? "Annuler" : "Créer une nouvelle discussion" }}
    </b-button>
    <NewDiscussionForm
      v-if="showNewDiscussionForm"
      @discussion-created="handleDiscussionCreated"
    />

    <b-tabs card>
      <b-tab title="Discussions récentes" active>
        <DiscussionList :discussions="filteredDiscussionsRecent" />
      </b-tab>
      <b-tab title="Discussions populaires">
        <DiscussionList :discussions="filteredDiscussionsPopular" />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import DiscussionList from "../components/DiscussionList.vue";
import NewDiscussionForm from "../components/NewDiscussionForm.vue";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

const discussions = ref([]);
const searchTerm = ref("");
const selectedCategory = ref("all");
const showNewDiscussionForm = ref(false);

const categories = ref([
  { value: "all", text: "Toutes les catégories" },
  { value: "general", text: "Général" },
  { value: "tech", text: "Technologie" },
  { value: "news", text: "Actualités" },

]);

const loading = ref(false);
const error = ref(null);

const categoryOptions = categories.value;

async function loadDiscussions() {
  loading.value = true;
  error.value = null;
  try {
    const q = query(collection(db, "discussions"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    discussions.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

const filteredDiscussionsRecent = computed(() => {
  return discussions.value
    .filter((d) => selectedCategory.value === "all" || d.category === selectedCategory.value)
    .filter((d) => d.title.toLowerCase().includes(searchTerm.value.toLowerCase()))
    .slice(0, 10); 
});

const filteredDiscussionsPopular = computed(() => {
  return discussions.value
    .filter((d) => selectedCategory.value === "all" || d.category === selectedCategory.value)
    .filter((d) => d.title.toLowerCase().includes(searchTerm.value.toLowerCase()))
    .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
    .slice(0, 10);
});

function onSearch() {
  
}

function filterByCategory() {

}

function handleDiscussionCreated() {
  showNewDiscussionForm.value = false;
  loadDiscussions();
}

onMounted(() => {
  loadDiscussions();
});
</script>

<style scoped>
.container {
  max-width: 900px;
}
</style>
