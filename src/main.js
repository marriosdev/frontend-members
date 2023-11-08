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
