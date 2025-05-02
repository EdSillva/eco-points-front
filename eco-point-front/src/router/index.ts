import { getAuth } from 'firebase/auth';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const publicPages = ['Login', 'Register'];
  const requiresAuth = !publicPages.includes(to.name as string);

  if (requiresAuth && !user) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
