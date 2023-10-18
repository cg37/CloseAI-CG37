import './style.css'
//import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'vant/lib/index.css'

import { pinia } from './store'

const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')
