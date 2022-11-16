import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pikachu',
    name: 'Swagger',
    component: () => import('../views/SwaggerFolder.vue')
  },
  {
    path: '/pikachu/project/:projectId',
    name: 'Project',
    component: () => import('../views/SwaggerServers.vue')
  },
  {
    path: '/pikachu/project/:projectId/server/:serverId',
    name: 'ServerDoc',
    component: () => import('../views/SwaggerServerDoc.vue')
  },
  {
    path: '/taskmanage',
    name: 'TaskManage',
    component: () => import('../views/TaskManager.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
