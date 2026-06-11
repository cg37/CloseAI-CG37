<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useChatStore } from '../store'
import { showConfirmDialog } from 'vant'
import type { Chat } from '../store'

const store = useChatStore()
const router = useRouter()

// 使用计算属性避免每次渲染都创建新数组
const reversedChats = computed<Chat[]>(() => {
  const chats = store.chats
  const result: Chat[] = []
  for (let i = chats.length - 1; i >= 0; i--) {
    result.push(chats[i])
  }
  return result
})

const addChat = () => {
  const id = store.addChat()
  router.push('/chat/' + id)
}

const confirmDelete = async (id: string, event: Event) => {
  event.preventDefault()
  event.stopPropagation()

  try {
    await showConfirmDialog({
      title: '删除对话',
      message: '确定要删除这个对话吗？',
    })
    store.deleteChat(id)
  } catch {
    // 用户取消
  }
}
</script>

<template>
  <div class="flex flex-col grow h-full">
    <div class="w-full h-full flex flex-col">
      <h1 class="title w-full h-14 justify-center items-center flex border-b text-white text-2xl shrink-0">
        AI-Chat
      </h1>

      <ul class="divide-y divide-slate-600 grow overflow-y-auto">
        <li
          v-for="chat in reversedChats"
          :key="chat.id"
          class="flex bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          <router-link
            :to="'/chat/' + chat.id"
            class="flex gap-3 grow overflow-hidden p-2 min-w-0"
          >
            <img
              class="w-10 h-10 rounded shrink-0"
              src="../pic/tzxl.jpg"
              alt="avatar"
            >
            <div class="flex flex-col justify-center overflow-hidden min-w-0">
              <span class="text-white font-medium truncate">
                {{ chat.summary || 'New Chat' }}
              </span>
              <span class="text-xs text-slate-400 truncate">
                {{ chat.messages.at(-1)?.content || 'No messages yet' }}
              </span>
            </div>
          </router-link>
          <button
            class="self-center justify-center text-white items-center flex cursor-pointer h-12 w-12 hover:bg-red-600/50 shrink-0 transition-colors"
            @click="confirmDelete(chat.id, $event)"
            aria-label="Delete chat"
          >
            ❌
          </button>
        </li>
      </ul>

      <!-- 空状态 -->
      <div
        v-if="!store.chats.length"
        class="flex flex-col items-center justify-center py-12 text-slate-500"
      >
        <span class="text-4xl mb-2">💬</span>
        <p>No chats yet</p>
      </div>

      <!-- 添加按钮 -->
      <button
        class="absolute bottom-20 right-6 bg-emerald-600 flex rounded-full self-center justify-center text-white text-3xl items-center cursor-pointer h-14 w-14 hover:bg-emerald-500 shadow-lg hover:shadow-xl transition-all active:scale-95"
        @click="addChat"
        aria-label="Add new chat"
      >
        +
      </button>
    </div>
  </div>
</template>
