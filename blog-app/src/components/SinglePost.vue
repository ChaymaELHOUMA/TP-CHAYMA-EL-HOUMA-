<template>
  <div class="single-post-card">
    <h2 class="title">{{ post.title }}</h2>

    <p class="excerpt">
      {{ post.body.substring(0, 120) }}...
    </p>

    <div class="tag-cloud">
      <router-link
        v-for="tag in post.tags"
        :key="tag"
        :to="`/tags/${tag}`"
        class="tag"
      >
        #{{ tag }}
      </router-link>
    </div>

    <router-link :to="`/post/${post.id}`" class="read-more">
      Lire la suite ...
    </router-link>

    
    <router-link :to="`/edit/${post.id}`" class="edit-btn">
      Modifier
    </router-link>

    <button @click="deletePost" class="delete-btn">
      Supprimer
    </button>

  </div>
</template>

<script>
export default {
  props: ["post"],

  methods: {
    deletePost() {
      if (!confirm("Voulez-vous vraiment supprimer ce post ?")) return

      fetch(`http://localhost:3000/posts/${this.post.id}`, {
        method: "DELETE"
      })
        .then(() => {
          alert("Post supprimé avec succès !");
          location.reload();
        })
        .catch(err => console.error(err));
    }
  }
}
</script>

<style scoped>
.single-post-card {
  background: white;
  padding: 20px;
  border-radius: 16px;
  border: 1px solid #eaeaea;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
  transition: 0.25s ease;
}

.single-post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 28px rgba(0,0,0,0.10);
}

.title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.excerpt {
  color: #555;
  margin-bottom: 14px;
}

.tag-cloud {
  margin-bottom: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px; 
}


.tag {
  display: inline-block;
 
  padding: 4px 10px;
  background: #f2f2f2;
  border-radius: 12px;
  font-size: 0.85rem;
}

.tag:hover {
  background: #e3e3e3;
}

.read-more {
  color: #0066ff;
  font-weight: 600;
  text-decoration: none;
  margin-right: 12px;
}

.read-more:hover {
  text-decoration: underline;
}

.edit-btn {
  margin-left: 10px;
  color: #1e00ffff;
  font-weight: bold;
}

.delete-btn {
  margin-left: 10px;
  background: #564dffff;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
}

.delete-btn:hover {
  background: #0017e6ff;
}
</style>
