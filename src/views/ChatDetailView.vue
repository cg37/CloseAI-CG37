<template>
  <div class="flex flex-col h-full overflow-hidden bg-slate-900 rounded-md">
    <!-- 标题栏 -->
    <h1 class="title w-full h-14 justify-center items-center flex border-b text-white text-2xl relative">
      <router-link
        class="absolute left-0 h-full px-2 justify-center items-center flex select-none"
        to="/"
      >
        Return
      </router-link>
      <span>{{ chat?.summary || 'New Chat' }}</span>
      <span
        @click="showActions = true"
        class="cursor-pointer absolute font-bold right-0 h-full px-4 justify-center items-center flex select-none text-2xl"
      >
        ⋯
      </span>
      <ActionSheet
        cancel-text="Cancel"
        description="Actions..."
        v-model:show="showActions"
        :actions="actions"
        @select="onActionSelect"
      />
    </h1>

    <!-- 消息列表 -->
    <div
      ref="msgsView"
      @touchmove="setAutoScroll"
      @mousewheel="setAutoScroll"
      class="grow bg-zinc-900 p-2 space-y-3 overflow-auto rounded-lg scroll-smooth"
    >
      <!-- 空状态 - 选择面具 -->
      <template v-if="!messages.length">
        <h2 class="mx-auto text-white text-center text-lg mb-4">选择面具</h2>
        <div class="space-y-2">
          <div
            v-for="mask in masks"
            :key="mask.id"
            class="flex flex-col border border-slate-600 rounded-lg p-3 text-white cursor-pointer hover:bg-slate-800 transition-colors"
            @click="setMask(mask)"
          >
            <h3 class="font-bold text-xl mb-1">{{ mask.title }}</h3>
            <div class="line-clamp-3 text-slate-400 text-sm">{{ mask.content }}</div>
          </div>
        </div>
      </template>

      <!-- 聊天消息 -->
      <template v-else>
        <h2 class="mx-auto text-white text-center text-slate-500 text-sm">start chat</h2>

        <div
          v-for="(msg, idx) in messages"
          :key="idx"
          :class="['msg-' + msg.role]"
          class="group flex"
        >
          <div
            :style="{ fontSize: store.config.fontSize + 'px' }"
            class="whitespace-pre-wrap text-white border border-gray-600 bg-stone-900 rounded-2xl p-3 max-w-[85%] break-words"
            :class="{
              'rounded-bl-none': msg.role === 'assistant',
              'rounded-br-none ml-auto': msg.role === 'user' || msg.role === 'system',
              'bg-slate-900': msg.role === 'user',
              'bg-green-900': msg.role === 'system'
            }"
          >
            {{ msg.content.trim() }}
          </div>
        </div>
      </template>
    </div>

    <!-- 输入区域 -->
    <div id="inputField" class="w-full flex flex-row-reverse border-t border-slate-600">
      <button
        class="py-0 px-4 w-20 bg-sky-500 text-md text-white font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        id="submit"
        @click="send"
        :disabled="!userInput.trim() || isLoading"
      >
        {{ isLoading ? '...' : 'Send' }}
      </button>
      <textarea
        class="w-full h-12 py-2 px-3 resize-none bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500"
        placeholder="Try to say something..."
        id="questionInput"
        v-model="userInput"
        @keydown.enter.prevent="handleEnter"
        :disabled="isLoading"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, nextTick, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ActionSheet, showConfirmDialog, showToast } from 'vant'
import { useChatStore } from '../store'
import { getAnswerStream2, getSummary } from '../chatgpt-api.js'

const route = useRoute()
const router = useRouter()
const store = useChatStore()

const chat = computed(() => store.chats.find(it => it.id === route.params.id))
const messages = computed(() => chat.value?.messages || [])
const masks = computed(() => store.allMasks)

const msgsView = ref()
const userInput = ref('')
const autoScroll = ref(true)
const showActions = ref(false)
const isLoading = ref(false)

// 滚动到底部
const scrollToBottom = async () => {
  await nextTick()
  if (msgsView.value) {
    msgsView.value.scrollTo({
      top: msgsView.value.scrollHeight,
      behavior: 'smooth'
    })
  }
}

onMounted(() => {
  scrollToBottom()
})

// 自动滚动检测
const setAutoScroll = () => {
  const el = msgsView.value
  if (!el) return
  const threshold = 20
  autoScroll.value = el.scrollHeight - el.scrollTop - el.clientHeight < threshold
}

// 操作菜单
const actions = [
  { name: 'Change chat title', value: 'rename' },
  { name: 'Delete', value: 'delete', color: '#ee0a24' },
]

const onActionSelect = async (action) => {
  showActions.value = false

  if (action.value === 'rename') {
    const newTitle = prompt('Please input new title:', chat.value?.summary || '')
    if (newTitle?.trim() && chat.value) {
      chat.value.summary = newTitle.trim()
    }
  } else if (action.value === 'delete') {
    try {
      await showConfirmDialog({
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this chat?',
      })
      store.deleteChat(route.params.id)
      router.replace('/')
    } catch {
      // User cancelled
    }
  }
}

// 设置面具
const setMask = (mask) => {
  if (!chat.value) return
  chat.value.messages.push({
    role: 'system',
    content: mask.content
  })
  chat.value.summary = mask.title
  scrollToBottom()
}

// 处理 Enter 键
const handleEnter = (e) => {
  if (e.shiftKey) {
    userInput.value += '\n'
  } else {
    send()
  }
}

// 发送消息
const send = async () => {
  const content = userInput.value.trim()
  if (!content || isLoading.value || !chat.value) return

  // 添加用户消息
  chat.value.messages.push({
    role: 'user',
    content
  })

  userInput.value = ''
  isLoading.value = true
  await scrollToBottom()
  autoScroll.value = true

  // 添加助手消息占位
  chat.value.messages.push({
    role: 'assistant',
    content: ''
  })

  const answerObj = chat.value.messages.at(-1)

  try {
    await getAnswerStream2(messages.value, async (token) => {
      answerObj.content += token
      if (autoScroll.value) {
        await scrollToBottom()
      }
    })

    // 自动生成标题
    if (!chat.value.summary || chat.value.summary === 'New Chat' || chat.value.summary === 'new Chat') {
      const summary = await getSummary(chat.value.messages)
      if (summary) {
        chat.value.summary = summary
      }
    }
  } catch (err) {
    showToast({
      type: 'fail',
      message: err.message || '发送失败',
    })
    // 移除失败的助手消息
    chat.value.messages.pop()
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.scroll-smooth {
  scroll-behavior: smooth;
}

.scroll-smooth::-webkit-scrollbar {
  width: 8px;
}

.scroll-smooth::-webkit-scrollbar-track {
  background-color: rgb(31, 28, 28);
}

.scroll-smooth::-webkit-scrollbar-thumb {
  background: #434141;
  border-radius: 4px;
}

.scroll-smooth::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
