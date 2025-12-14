<template>
  <b-list-group-item>
    <router-link :to="{ name: 'Discussion', params: { id: discussion.id } }">
      <strong>{{ discussion.title }}</strong>
      <div class="text-muted small">
        Par {{ discussion.authorName }} - {{ formatDate(discussion.createdAt) }}
      </div>
    </router-link>
  </b-list-group-item>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  discussion: Object,
});

function formatDate(timestamp) {
  if (!timestamp) return "";
  return timestamp.toDate().toLocaleString();
}
</script>
