import { createApp } from 'vue'
import './style.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'

import 'vant/lit/index.css'

import {pinia} from './store'

const app = createApp(app)
app.use(router)
app.use(pinia)

createApp(App).mount('#app')
