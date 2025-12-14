<template>
  <div class="container mt-4">
    <b-button variant="primary" class="mb-3" @click="showNewDiscussionForm = true">
      + Créer une nouvelle discussion
    </b-button>

    <newDiscussionForm 
      v-if="showNewDiscussionForm" 
      @created="onDiscussionCreated" 
      @cancel="showNewDiscussionForm = false" 
    />

    <b-card v-if="loadingDiscussion" class="text-center">
      <b-spinner label="Chargement..."></b-spinner>
    </b-card>

    <b-card v-else>
      <h3>{{ discussion.title }}</h3>
      <p class="text-muted">Par {{ discussion.authorName }} — {{ formatDate(discussion.createdAt) }}</p>
      <hr />
      <p>{{ discussion.content }}</p>
    </b-card>

    <section class="mt-4">
      <h4>Réponses</h4>

      <ResponseList
        :responses="responses"
        @edit="onEditResponse"
        @delete="onDeleteResponse"
      />

      <b-card class="mt-3">
        <h5>Ajouter une réponse</h5>
        <NewResponseForm @submit="addResponse" />
      </b-card>
    </section>

    <b-modal
      id="edit-response-modal"
      title="Modifier la réponse"
      v-model="showEditModal"
      @hide="resetEditResponse"
      ok-title="Sauvegarder"
      @ok="saveEditedResponse"
    >
      <b-form-textarea
        v-model="editResponseContent"
        rows="4"
        placeholder="Modifier votre réponse..."
      ></b-form-textarea>
    </b-modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import ResponseList from "../components/ResponseList.vue";
import NewResponseForm from "../components/NewResponseForm.vue";
import NewDiscussionForm from "../components/NewDiscussionForm.vue";

const route = useRoute();

const discussion = ref(null);
const loadingDiscussion = ref(true);
const error = ref(null);

const responses = ref([]);

const showEditModal = ref(false);
const editResponseId = ref(null);
const editResponseContent = ref("");

const showNewDiscussionForm = ref(false);

async function loadDiscussion() {
  loadingDiscussion.value = true;
  error.value = null;
  try {
    const docRef = doc(db, "discussions", route.params.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      discussion.value = { id: docSnap.id, ...docSnap.data() };
    } else {
      error.value = "Discussion non trouvée";
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    loadingDiscussion.value = false;
  }
}

async function loadResponses() {
  try {
    const q = query(
      collection(db, "responses"),
      where("discussionId", "==", route.params.id)
    );
    const querySnapshot = await getDocs(q);
    responses.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (err) {
    error.value = err.message;
  }
}

function formatDate(timestamp) {
  return timestamp ? timestamp.toDate().toLocaleString() : "";
}

async function addResponse(content) {
  try {
    await addDoc(collection(db, "responses"), {
      content,
      discussionId: route.params.id,
      authorId: "", 
      authorName: "", 
      createdAt: serverTimestamp(),
    });
    await loadResponses();
  } catch (err) {
    error.value = err.message;
  }
}

function onEditResponse(response) {
  editResponseId.value = response.id;
  editResponseContent.value = response.content;
  showEditModal.value = true;
}

async function saveEditedResponse() {
  if (!editResponseId.value) return;
  try {
    const docRef = doc(db, "responses", editResponseId.value);
    await updateDoc(docRef, { content: editResponseContent.value });
    await loadResponses();
    showEditModal.value = false;
  } catch (err) {
    error.value = err.message;
  }
}

async function onDeleteResponse(responseId) {
  if (!confirm("Voulez-vous supprimer cette réponse ?")) return;
  try {
    await deleteDoc(doc(db, "responses", responseId));
    await loadResponses();
  } catch (err) {
    error.value = err.message;
  }
}

function resetEditResponse() {
  editResponseId.value = null;
  editResponseContent.value = "";
  showEditModal.value = false;
}

function onDiscussionCreated() {
  showNewDiscussionForm.value = false;
  
}

onMounted(async () => {
  await loadDiscussion();
  await loadResponses();
});
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
