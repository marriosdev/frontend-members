import { createRouter, createWebHistory } from 'vue-router'

import Home from '../Pages/Home.vue'
import Members from '../Pages/Members.vue'
import AddCommunity from '../Pages/AddCommunity.vue'
import AddCommunityAdmin from '../Pages/AddCommunityAdmin.vue'
import Login from '../Pages/Login.vue'
import Member from '../Pages/Member.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  
  routes: [
    {
      path: '/',
      name: '',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/membros',
      name: 'membros',
      component: Members
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
    },
    {
      path: '/member/:memberId',
      name: 'member',
      component: Member
    }
  ]
})

export default router
