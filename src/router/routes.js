import { createWebHistory, createRouter } from 'vue-router';
import { routes } from './paths';

const router = createRouter({
  history: createWebHistory(),
  routes: [...routes, { path: '/:catchAll(.*)', redirect: '/' }],
});

export default router;