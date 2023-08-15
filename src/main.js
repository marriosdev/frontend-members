import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import api from './api'

import 'materialize-css/dist/css/materialize.css'
import 'material-design-icons/iconfont/material-icons.css'
import 'materialize-css/dist/js/materialize.js'
import 'mosha-vue-toastify/dist/style.css'

import './Assets/css/global.css'
const app = createApp(App)

app.use(router)
app.mount('#app')

app.config.globalProperties.api = api

api.get('me')
    .then(response => {
        localStorage.setItem('isLogged', true)
    }).catch(error => {
        localStorage.setItem('isLogged', false)
        router.push('login')
    })

router.beforeEach((to, from, next) => {
    let logado = localStorage.isLogged

    if ((logado == 'false' || logado == undefined) && to.name != "login") {
        api.get('api/me')
            .then(response => {
                localStorage.setItem('isLogged', true)
            }).catch(error => {
                localStorage.setItem('isLogged', false)
                router.push('login')
            })
    }

    if (logado == 'true' && (to.name == "login")) {
        router.push('')
    }
    next()
    return
})