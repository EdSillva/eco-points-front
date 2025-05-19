import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createRouter, createWebHistory } from 'vue-router';

let isAuthChecked = false;

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
  const publicPages = ['Login', 'Register'];
  const requiresAuth = !publicPages.includes(to.name as string);

  if (isAuthChecked) {
    const user = auth.currentUser;
    if (requiresAuth && !user) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    // Espera o Firebase dizer se está logado ou não
    onAuthStateChanged(auth, (user) => {
      isAuthChecked = true;
      if (requiresAuth && !user) {
        next({ name: 'Login' });
      } else {
        next();
      }
    });
  }
});

export default router;
