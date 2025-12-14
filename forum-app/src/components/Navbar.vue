<template>
  <b-navbar toggleable="lg" type="dark" variant="primary">
    <b-navbar-brand to="/">ForumApp</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ms-auto">

        <b-nav-item to="/">Accueil</b-nav-item>

      
        <b-nav-item v-if="!user" to="/login">Connexion</b-nav-item>
        <b-nav-item v-if="!user" to="/register">Inscription</b-nav-item>
        
        <b-nav-item-dropdown v-if="user" right>
          <template #button-content>
            <i class="bi bi-person-circle fs-4"></i>
          </template>

          <b-dropdown-item to="/profile">Profil</b-dropdown-item>
          <b-dropdown-item @click="logout">Déconnexion</b-dropdown-item>
        </b-nav-item-dropdown>

      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script setup>
import { useAuth } from '../composables/useAuth';

const { user, logout } = useAuth();
</script>

<style>
@import "bootstrap-icons/font/bootstrap-icons.css";
</style>
