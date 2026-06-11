<template>
  <div class="h-full w-full flex flex-col">
    <h1 class="title w-full h-14 justify-center items-center flex border-b text-white text-2xl shrink-0">
      Masks
    </h1>

    <div class="flex-1 overflow-auto p-3">
      <div class="space-y-3">
        <div
          v-for="mask in masks"
          :key="mask.id"
          class="flex flex-col border border-slate-600 rounded-lg p-3 bg-slate-800"
        >
          <h3 class="font-bold text-xl text-white flex items-center gap-2">
            <span class="flex-1">{{ mask.title }}</span>
            <button
              class="border border-slate-500 rounded-md px-3 py-1 text-sm hover:bg-slate-700 transition-colors"
              @click="openEdit(mask)"
            >
              Edit
            </button>
            <button
              class="border border-red-500/50 text-red-400 rounded-md px-3 py-1 text-sm hover:bg-red-500/20 transition-colors"
              @click="confirmDelete(mask.id)"
            >
              Delete
            </button>
          </h3>
          <p class="line-clamp-3 text-slate-400 text-sm mt-2">{{ mask.content }}</p>
        </div>
      </div>

      <!-- 空状态 -->
      <div
        v-if="!masks.length"
        class="flex flex-col items-center justify-center py-12 text-slate-500"
      >
        <span class="text-4xl mb-2">🎭</span>
        <p>No custom masks</p>
      </div>
    </div>

    <!-- 添加按钮 -->
    <button
      class="absolute bottom-20 right-6 bg-emerald-600 flex rounded-full self-center justify-center text-white text-3xl items-center cursor-pointer h-14 w-14 hover:bg-emerald-500 shadow-lg hover:shadow-xl transition-all active:scale-95"
      @click="showCreate = true"
      aria-label="Add new mask"
    >
      +
    </button>

    <!-- 创建对话框 -->
    <Dialog
      v-model:show="showCreate"
      title="New Mask"
      show-cancel-button
      @confirm="createMask"
      @cancel="resetCreate"
    >
      <div class="p-4 space-y-3">
        <input
          type="text"
          v-model="newMask.title"
          placeholder="Mask Title"
          class="text-white bg-slate-700 w-full px-3 py-2 rounded outline-none focus:ring"
        >
        <textarea
          v-model="newMask.content"
          placeholder="Mask Content"
          class="text-white resize-none bg-slate-700 w-full h-32 px-3 py-2 rounded outline-none focus:ring"
        />
      </div>
    </Dialog>

    <!-- 编辑对话框 -->
    <Dialog
      v-model:show="showEdit"
      title="Edit Mask"
      show-cancel-button
      @confirm="saveEdit"
      @cancel="cancelEdit"
    >
      <div class="p-4 space-y-3">
        <input
          type="text"
          v-model="editingMask.title"
          placeholder="Mask Title"
          class="text-white bg-slate-700 w-full px-3 py-2 rounded outline-none focus:ring"
        >
        <textarea
          v-model="editingMask.content"
          placeholder="Mask Content"
          class="text-white resize-none bg-slate-700 w-full h-32 px-3 py-2 rounded outline-none focus:ring"
        />
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useChatStore } from '../store'
import { Dialog, showConfirmDialog } from 'vant'
import type { Mask } from '../store'

const store = useChatStore()

// 使用 store 中的 getter
const masks = store.allMasks

// 创建新面具
const showCreate = ref(false)
const newMask = reactive({
  title: '',
  content: ''
})

const createMask = () => {
  if (!newMask.title.trim() || !newMask.content.trim()) {
    return
  }
  store.customMasks.push({
    id: store.addMask(),
    title: newMask.title.trim(),
    content: newMask.content.trim()
  })
  resetCreate()
}

const resetCreate = () => {
  newMask.title = ''
  newMask.content = ''
  showCreate.value = false
}

// 编辑面具
const showEdit = ref(false)
const editingMask = reactive<Partial<Mask>>({
  id: '',
  title: '',
  content: ''
})

const openEdit = (mask: Mask) => {
  editingMask.id = mask.id
  editingMask.title = mask.title
  editingMask.content = mask.content
  showEdit.value = true
}

const saveEdit = () => {
  if (!editingMask.id || !editingMask.title?.trim() || !editingMask.content?.trim()) {
    return
  }
  store.editMask(
    editingMask.id,
    editingMask.title.trim(),
    editingMask.content.trim()
  )
  showEdit.value = false
}

const cancelEdit = () => {
  showEdit.value = false
}

// 删除面具
const confirmDelete = async (id: string) => {
  try {
    await showConfirmDialog({
      title: '删除面具',
      message: '确定要删除这个面具吗？',
    })
    store.deleteMask(id)
  } catch {
    // 用户取消
  }
}
</script>
