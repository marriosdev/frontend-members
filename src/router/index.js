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
      path: "/leituraMensal",
      name: "leituraMensal",
      component: () => import("../Pages/MonthlyReading.vue"),
      meta: {
        auth: true
      }
    },
    {
      path: '/logout',
      name: 'logout',
      meta: {
        auth: false
      }
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        auth: true
      }
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        auth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        auth: false
      }
    },
    {
      path: '/membros',
      name: 'membros',
      component: Members,
      meta: {
        auth: true
      }
    },
    {
      path: '/adicionarComunidade',
      name: 'adicionarComunidade',
      component: AddCommunity,
      meta: {
        auth: true
      }
    },
    {
      path: '/adicionarAdminComunidade',
      name: 'adicionarAdminComunidade',
      component: AddCommunityAdmin,
      meta: {
        auth: true
      }
    },
    {
      path: '/member/:memberId',
      name: 'member',
      component: Member,
      meta: {
        auth: true
      }
    }
  ]
})

export default router
import api from '../api'
import { createToast } from 'mosha-vue-toastify'

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.auth)) {
    api.get("logged").then((response) => {
      next()
      return
    }).catch(() => {
      createToast("Você não está logado", {
        type: "warning",
        showIcon: "true",
      })
      localStorage.clear()
      next({ path: "/login" })
    })
  } else {
    if(localStorage.getItem('token')) {
      router.push({ path: '/home' })
    }
    next()
  }
})