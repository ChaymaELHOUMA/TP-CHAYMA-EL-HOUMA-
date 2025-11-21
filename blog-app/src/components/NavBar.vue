<template>
  <nav class="navbar container">
    <div class="logo">MyBlog</div>
    <div class="nav-links">
      <router-link to="/">Home</router-link>
      <router-link to="/create">Add Post</router-link>
    
    </div>
  </nav>
</template>

<script>
export default {}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px;
  background-color: #0d6efd; 
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  flex-wrap: wrap;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a {
  color: white;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.nav-links a:hover {
  color: #0d1dfdff ;
  transform: scale(1.05);
}

@media (max-width: 600px) {
  .navbar {
    flex-direction: column;
    gap: 10px;
  }
  .nav-links {
    flex-direction: column;
    gap: 10px;
    width: 100%;
    text-align: center;
  }
}
</style>
