import { createRouter, createWebHistory } from "vue-router";
import { getAuth } from "firebase/auth";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Profile from "../views/Profile.vue";
import Discussion from "../views/Discussion.vue";
import Admin from "../views/Admin.vue";
import ResetPassword from "../views/ResetPassword.vue";

const routes = [
  { path: "/", redirect: "/home" },

  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  { path: "/home", name: "Home", component: Home },

  { path: "/profile", name: "Profile", component: Profile, meta: { requiresAuth: true } },
  { path: "/discussion/:id", name: "Discussion", component: Discussion },
  { path: "/admin", name: "Admin", component: Admin, meta: { requiresAuth: true, requiresModerator: true } },

  { path: "/reset-password", name: "ResetPassword", component: ResetPassword },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const user = auth.currentUser; 

  if (to.meta.requiresAuth && !user) {
    next("/login");
  } else if (to.meta.requiresModerator && user?.role !== "moderator") {
    next("/home");
  } else {
    next();
  }
});

export default router;
