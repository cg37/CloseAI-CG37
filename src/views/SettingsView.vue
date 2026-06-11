<template>
  <div class="w-full h-full flex flex-col">
    <div class="title w-full h-14 justify-center items-center flex border-b text-white text-2xl">
      Settings
    </div>

    <div class="grow overflow-y-auto">
      <!-- Model 选择 -->
      <div class="flex h-12 items-center mt-4 px-4">
        <span class="w-24 text-white">Mode:</span>
        <select
          v-model="config.model"
          class="rounded focus:ring outline-none bg-slate-700 h-10 text-white flex-1 max-w-xs"
        >
          <option>gpt-4</option>
          <option>gpt-4-32k</option>
          <option>gpt-3.5-turbo</option>
        </select>
      </div>

      <!-- 参数调节 -->
      <div class="px-4 space-y-4 mt-4">
        <div class="text-white flex h-12 items-center">
          <span class="w-24">随机性</span>
          <span class="w-12 text-center">{{ config.temperature }}</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            v-model.number="config.temperature"
            class="flex-1 max-w-xs ml-4"
          >
        </div>

        <div class="text-white flex h-12 items-center">
          <span class="w-24">核采样</span>
          <span class="w-12 text-center">{{ config.top_p }}</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            v-model.number="config.top_p"
            class="flex-1 max-w-xs ml-4"
          >
        </div>

        <div class="text-white flex h-12 items-center">
          <span class="w-24">话题新鲜度</span>
          <span class="w-12 text-center">{{ config.presence_penalty }}</span>
          <input
            type="range"
            min="-2"
            max="2"
            step="0.1"
            v-model.number="config.presence_penalty"
            class="flex-1 max-w-xs ml-4"
          >
        </div>

        <div class="text-white flex h-12 items-center">
          <span class="w-24">频率惩罚度</span>
          <span class="w-12 text-center">{{ config.frequency_penalty }}</span>
          <input
            type="range"
            min="-2"
            max="2"
            step="0.1"
            v-model.number="config.frequency_penalty"
            class="flex-1 max-w-xs ml-4"
          >
        </div>
      </div>

      <hr class="border-slate-600 my-4 mx-4">

      <!-- 其他设置 -->
      <div class="px-4 space-y-4">
        <div class="text-white flex h-12 items-center">
          <span class="w-24">聊天字号</span>
          <span class="w-12 text-center">{{ config.fontSize }}</span>
          <input
            type="range"
            min="12"
            max="36"
            step="1"
            v-model.number="config.fontSize"
            class="flex-1 max-w-xs ml-4"
          >
        </div>

        <div class="text-white flex items-center">
          <span class="w-24 shrink-0">API地址</span>
          <input
            type="text"
            v-model="config.apiBase"
            placeholder="https://api.openai.com"
            class="flex-1 bg-slate-600 text-white px-3 py-2 rounded outline-none focus:ring"
          >
        </div>

        <div class="text-white flex items-center">
          <span class="w-24 shrink-0">API Key</span>
          <input
            type="password"
            v-model="config.apiKey"
            placeholder="sk-..."
            class="flex-1 bg-slate-600 text-white px-3 py-2 rounded outline-none focus:ring"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useChatStore } from '../store'
import { storeToRefs } from 'pinia'

const store = useChatStore()
const { config } = storeToRefs(store)
</script>
