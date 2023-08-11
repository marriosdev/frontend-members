import { createRouter, createWebHistory } from 'vue-router'

import Home from '../Pages/Home.vue'
import Members from '../Pages/Members.vue'
import AddMember from '../Pages/AddMember.vue'
import AddCommunity from '../Pages/AddCommunity.vue'
import AddCommunityAdmin from '../Pages/AddCommunityAdmin.vue'
import Login from '../Pages/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
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
    },
    {
      path: '/adicionarComunidade',
      name: 'adicionarComunidade',
      component: AddCommunity
    },
    {
      path: '/adicionarAdminComunidade',
      name: 'adicionarAdminComunidade',
      component: AddCommunityAdmin
    }
  ]
})

export default router
