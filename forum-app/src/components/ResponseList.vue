<template>
  <div>
    <ResponseItem
      v-for="response in responses"
      :key="response.id"
      :response="response"
      @edit="$emit('edit', $event)"
      @delete="$emit('delete', $event)"
    />
  </div>
</template>

<script setup>
import ResponseItem from "./ResponseItem.vue";

const props = defineProps({
  responses: Array,
});

const emit = defineEmits(["edit", "delete"]);
</script>
