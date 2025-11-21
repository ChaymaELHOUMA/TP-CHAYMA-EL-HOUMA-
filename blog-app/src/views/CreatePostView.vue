<template>
  <form class="post-form" @submit.prevent="submitPost">
    <input v-model="title" placeholder="Titre" required />
    <textarea v-model="body" placeholder="Contenu" required></textarea>
    <input v-model="tags" placeholder="Tags séparés par des virgules" />
    <button type="submit">Créer</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const title = ref('')
    const body = ref('')
    const tags = ref('')
    const router = useRouter()

    async function submitPost() {
      await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.value,
          body: body.value,
          tags: tags.value.split(',')
        })
      })
      router.push('/')
    }

    return { title, body, tags, submitPost }
  }
}
</script>

<style scoped>
.post-form {
  max-width: 550px;
  margin: 40px auto;
  padding: 28px;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.post-form input,
.post-form textarea {
  width: 92%;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid #dcdcdc;
  font-size: 1rem;
  background: #fafafa;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.post-form input:focus,
.post-form textarea:focus {
  border-color: #4a8bff;
  background: #fff;
  outline: none;
  box-shadow: 0 0 0 3px rgba(74, 139, 255, 0.15);
}

.post-form textarea {
  min-height: 140px;
  resize: vertical;
}

button {
  padding: 14px 18px;
  border: none;
  border-radius: 12px;
  background: #4a8bff;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.25s ease, transform 0.15s ease;
}

button:hover {
  background: #2f6df0;
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0);
}
</style>
