<template>
  <div class="edit-post">
    <h2>Modifier le post</h2>

    <form @submit.prevent="updatePost">
      <input v-model="title" placeholder="Titre" required />

      <textarea v-model="body" placeholder="Contenu" required></textarea>

      <input v-model="tagsText" placeholder="Tags séparés par des virgules" />

      <button type="submit">Mettre à jour</button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: "EditPostView",
  setup() {
    const route = useRoute()
    const router = useRouter()

    const title = ref('')
    const body = ref('')
    const tagsText = ref('')
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:3000/posts/${route.params.id}`)
        const data = await res.json()
        title.value = data.title
        body.value = data.body
        tagsText.value = data.tags.join(',')
      } catch (err) {
        console.error("Erreur fetch post:", err)
      }
    }

    onMounted(fetchPost)

    
    const updatePost = async () => {
      const updatedPost = {
        title: title.value,
        body: body.value,
        tags: tagsText.value.split(',').map(t => t.trim())
      }

      try {
        await fetch(`http://localhost:3000/posts/${route.params.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedPost)
        })
        alert("Post mis à jour !")
        router.push(`/post/${route.params.id}`)
      } catch (err) {
        console.error("Erreur update post:", err)
      }
    }

    return { title, body, tagsText, updatePost }
  }
}
</script>

<style scoped>
.edit-post {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
}

input, textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

button {
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  background: #0066ff;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

button:hover {
  background: #0052cc;
}
</style>
