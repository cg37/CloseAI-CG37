import {defineStore, createPinia} from 'pinia'
import piniaPersist from "pinia-plugin-persist"

function id(){
  return Math.random().toString(36).slice(2)
}

export const pinia = createPinia()
pinia.use(piniaPersist)

type Mask = {
  title: string,
  content: string,
}

