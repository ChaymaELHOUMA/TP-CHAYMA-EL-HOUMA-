<template>
  <div class="post-list container">
    <SinglePost v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script>
import { getPosts } from '../composables/getPosts.js'
import SinglePost from './SinglePost.vue'

export default {
  components: { SinglePost },
  setup() {
    const { posts, fetchPosts } = getPosts()
    fetchPosts()
    return { posts }
  }
}
</script>

<style scoped>
.post-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 25px;
  margin-top: 25px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px;
}

@media (max-width: 768px) {
  .post-list {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
