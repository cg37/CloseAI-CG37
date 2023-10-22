<template>
  <div class="w-full h-full flex flex-col">

    <div class="title w-full h-14 justify-center items-center flex border-b text-white text-2xl">
      Settings
    </div>

    <div class="grow">
      <div class="flex h-12 items-center mt-4 ">
        <span class="w-24 ml-32 mr-28 text-white">Mode: </span>
        <select v-model="config.model" class="rounded focus:ring outline-none bg-slate-700 h-10 ml-2 text-white mr-8">
          <option>gpt-4</option>
          <option>gpt-4-32k</option>
          <option>gpt-3.5-turbo</option>
        </select>
      </div>

      <div class="ml-32 text-white mr-8 flex h-12 items-center">
        <span class="w-1/3 mr-auto">随机性</span>
        <span >{{ config.temperature }}</span>
        <input type="range" min="0" max="1" step="0.1" v-model.number="config.temperature" class="ml-2 w-40">
      </div>
      <div class="ml-32 text-white mr-8 flex h-12 items-center">
        <span class="w-1/3 mr-auto">核采样</span>
        <span >{{ config.top_p }}</span>
        <input type="range" min="0" max="1" step="0.1" v-model.number="config.top_p"  class="ml-2 w-40">
      </div>
      <div class="ml-32 text-white mr-8 flex h-12 items-center">
        <span class="w-1/3 mr-auto">话题新鲜度</span>
        <span >{{ config.presence_penalty }}</span>
        <input type="range" min="-2" max="2" step="0.1" v-model.number="config.presence_penalty"  class="ml-2 w-40">
      </div>
      <div class="ml-32 text-white mr-8 flex h-12 items-center">
        <span class="w-1/3 mr-auto">频率惩罚度</span>
        <span >{{ config.frequency_penalty }}</span>
        <input type="range" min="-2" max="2" step="0.1" v-model.number="config.frequency_penalty"  class="ml-2 w-40">
      </div>

      <hr>
      <div class="text-white flex h-12 items-center ml-32">
        <span class="w-1/3">聊天字号</span>
        <span class=" ml-10">{{ config.fontSize }}</span>
        <input type="range" min="12" max="36" step="1" v-model="config.fontSize"  class=" ml-2 w-40">
      </div>
      <div class="text-white flex h-12 items-center ml-32">
        <span class="w-1/3">API地址</span>
        <input type="text" min="12" max="36" step="1" v-model="config.apiBase"  class=" ml-10 w-48 bg-slate-600">
      </div>
      <div class="text-white flex h-12 items-center ml-32">
        <span class="w-1/3">API Key</span>
        <input type="text" min="12" max="36" step="1" v-model="config.apiKey"  class=" ml-10 w-48 bg-slate-600">
      </div>
    </div>

    </div>
</template>

<script setup lang="ts">
import { useChatStore } from '../store';
import {computed} from "vue"

let store = useChatStore()
let config = computed(()=>store.config)
</script>
