<template>
  <div class="h-full w-full">
    <h1 class="title w-full h-14 justify-center items-center flex border-b text-white text-2xl">
      Masks
    </h1>
    <div class="flex overflow-auto p-2 h-full">
      <div class="space-y-2">
        <div class="felx flex-col border rounded-lg p-2" v-for="mask of masks">
          <h3 class="font-bold text-xl text-white flex space-x-2">
            <span class="grow">
              {{ mask.title }}
            </span>
            <!--
              <button class="border rounded-md px-2" @click="showEdit = true">Edit</button>
            -->

            <button class="border rounded-md px-2" @click="store.deleteMask(mask.id)">Delete</button>

          </h3>
          <div class="w-full h-full float mx-auto">
              <Dialog v-model:show="showEdit" @confirm="showEdit=false" class="">
                <div class="p=4">
                  <h2 class="text-white text-center my-2">Edit Mask</h2>
                  <input type="text" v-model="mask.title" placeholder="Mask Title" class="text-white dark:bg-slate-700 mb-2 w-full px-2">
                  <textarea v-model="mask.content" placeholder="Mask Content" class="text-white resize-none dark:bg-slate-700 w-full h-64 px-2"></textarea>
                </div>
              </Dialog>
            </div>
          <div class="line-clamp-3 text-white">
            {{ mask.content }}
          </div>
        </div>
      </div>

      <span class="absolute bottom-20 right-10 bg-emerald-600	float-right float-bottom  flex rounded-full self-center justify-center text-white text-6xl items-center cursor-pointer h-12 w-12 hover:bg-emerald-300 shrink-0"
            @click="show=true">
        +
      </span>
      <Dialog v-model:show="show" @confirm="addMask" @cancel="show=false">
        <div class="p=4">
          <h2 class="text-white text-center my-2">New Mask</h2>
          <input type="text" v-model="newMaskTitle" placeholder="Mask Title" class="text-white dark:bg-slate-700 mb-2 w-full px-2">
          <textarea v-model="newMaskContent" placeholder="Mask Content" class="text-white resize-none dark:bg-slate-700 w-full h-40 px-2"></textarea>
        </div>
      </Dialog>
    </div>

  </div>
</template>

<script setup lang="ts">
  import { computed, ref} from 'vue'
  import { useChatStore } from '../store'
  import { Dialog } from 'vant'


  let store = useChatStore()
  let show = ref(false)
  let showEdit = ref(false)

  let newMaskTitle = ref('')
  let newMaskContent = ref('')

  function addMask(){
    if (newMaskContent.value === '' || newMaskTitle.value === '') {
      return
    }
    store.customMasks.push({
      title: newMaskTitle.value,
      content: newMaskContent.value,
      id: store.addMask()
    })
    newMaskContent.value = ''
    newMaskTitle.value = ''
  }

  let masks = computed(()=>[...store.presetMasks, ...store.customMasks])
  debugger
</script>
