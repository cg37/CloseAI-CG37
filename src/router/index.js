import { createRouter,createWebHashHistory } from "vue-router";

import MainView from '../router/MainView'
import ChatListView from "../router/ChatListView"
import AllMasks from "../router/AllMasks"
import MeView from "../router/MeView"
import ChatDetailView from "../router/ChatDetailView"

const router = createRouter({
  base: '.',
  history: createWebHashHistory(import.meta.env.BASU_URL),
  routes:[
    {
      path: '/',
      name: home,
      component: MainView,
      children:[{
        path: '',
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
