import { createRouter,createWebHashHistory } from "vue-router";

import MainView from '../views/MainView.vue'
import ChatListView from "../views/ChatListView.vue"
import AllMasks from "../views/AllMasks.vue"
import MeView from "../views/MeView.vue"
import ChatDetailView from "../views/ChatDetailView.vue"

const router = createRouter({
  base: '.',
  history: createWebHashHistory(import.meta.env.BASU_URL),
  routes:[
    {
      path: '/',
      name: "home",
      component: MainView,
      children:[{
        path: '/',
        component: ChatListView
      },{
        path:'/masks',
        component: AllMasks
      }, {
        path: '/me',
        component:MeView
      }]
    },
    {
      path: '/chat/:id',
      name: 'chat-detail',
      component: ChatDetailView
    }
  ]
})

export default router
