<template>
  <div class="tag-cloud">
    

    <router-link
      v-for="tag in uniqueTags"
      :key="tag"
      class="tag-item"
      :to="`/tags/${tag}`"
    >
      #{{ tag }}
    </router-link>
  </div>
</template>

<script>
import { computed } from 'vue'
import { getPosts } from '../composables/getPosts.js'

export default {
  setup() {
    const { posts, fetchPosts } = getPosts()
    fetchPosts()

    // Extraire les tags uniques
    const uniqueTags = computed(() => {
      if (!posts.value.length) return []
      const tags = posts.value.flatMap(post => post.tags || [])
      return [...new Set(tags)]
    })

    return { uniqueTags }
  }
}
</script>

<style scoped>
.tag-cloud {
  padding: 15px;
  background: #f8f8f8;
  border-radius: 8px;
  width: 200px;
}

.tag-item {
  display: inline-block;
  margin: 4px;
  padding: 4px 8px;
  background: #eeeeee;
  border-radius: 6px;
  text-decoration: none;
  color: #333;
}

.tag-item:hover {
  background: #ccc;
}
</style>
