import { createRouter, createWebHistory } from 'vue-router'

import Home from '../Pages/Home.vue'
import Members from '../Pages/Members.vue'
import AddMember from '../Pages/AddMember.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  
  routes: [
    {
      path: '/',
      name: '',
      component: Home
    },
    {
      path: '/members',
      name: 'members',
      component: Members
    },
    {
      path: '/adicionarMembro',
      name: 'adicionarMembro',
      component: AddMember
    }
  ]
})

export default router
