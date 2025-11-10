<template>
  <div>
    <nav class="navbar">
      <router-link to="/">Accueil</router-link>
    </nav>

    <router-view></router-view>
  </div>
</template>

<style scoped>
.navbar {
  background: #1e3a8a;
  padding: 12px;
  display: flex;
  gap: 15px;
}
.navbar a {
  color: white;
  font-weight: bold;
  text-decoration: none;
}
.navbar a:hover {
  text-decoration: underline;
}
</style>

<style>
body {
  font-family: Arial, sans-serif;
  background: #f3f4f6;
  margin: 0;
  padding: 0;
}

button {
  background: #2563eb;
  border: none;
  color: white;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
}

button:hover {
  background: #1e40af;
}

input, textarea {
  width: 100%;
  padding: 8px;
  margin: 6px 0;
  border: 1px solid #ccc;
  border-radius: 6px;
}
</style>
