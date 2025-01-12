import { createRouter, createWebHistory } from 'vue-router'

// Router configuration
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Main route - Dashboard
    {
      path: '/',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'), // Lazy loading
    },
    // Movies route
    {
      path: '/movies',
      name: 'movies',
      component: () => import('../views/MoviesView.vue'),
    },
    // Catch-all route for handling not found URLs
    {
      path: '/:catchAll(.*)*',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

export default router
