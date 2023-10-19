

<template>
  <div class="flex flex-col h-full overflow-hidden bg-slate-900">
    <h1 class="title w-full h-14 justify-center items-center flex border-b text-white text-2xl">
      <router-link class="absolute left-0 h-full px-2 justify-center items-center flex" to="/">返回</router-link>
      <span>{{ chat.summary || 'New Chat' }}</span>
    </h1>

    <div ref="msgsView" @touchmove="setAutoScroll" @mousewheel="setAutoScroll" class="grow bg-zinc-900 p-2 space-y-2 overflow-auto">
      <template v-if="message.length === 0">
        <h2 class="mx-auto text-white text-center">选择面具</h2>
        <div class="space-y-2">
            <div class="flex flex-col border rounded-lg p-2 text-white" v-for="mask of masks" @click="setMask(mask)">
              <h3 class="font-bold text-xl">{{ mask.title }}</h3>
              <div class="line-clamp-3">{{ mask.content }}</div>
            </div>
        </div>
      </template>
      <template v-else>
        helloworld
        <div v-for="(msg, idx) of messages" :key="idx" :class="'msg-' + msg.rold" class="[&.msg-assistang]:mr-4 [&.msg-user]:ml-4 [&.msg-system]:ml-4 group">
          <div
            :style="{fontSize: store.config.fontSize + 'px'}"
            class="
              whitespace-pre-wrap
              text-white
              border
              border-gray-400

              bg-stone-900
              group-[&.msg-user]:bg-slate-900
              group-[&.msg-system]:bg-green-900

              group-[&.msg-assistant]:rounded-bl-none
              group-[&.msg-user]:rounded-br-none
              group-[&.msg-system]:rounded-br-none
              group-[&.msg-system]:ml-auto
              group-[&.msg-user]:ml-auto

              w-fit
              rounded-2xl
              p-2
            "
            >
            {{ msg.content.trim() }}
          </div>

        </div>
      </template>
    </div>
    <div id="inputField" class="w-full flex flex-row-reverse bg-transparent">
     <button class=" py-0 px-4
        w-24
        bg-sky-500/100 rounded-r-lg
        text-md text-white font-semibold
        hover:bg-blue-700 focus:outline-none
        focus:ring-2 focus:ring-blue-400
        focus:ring-opacity-75
        "
        id="submit"
        @click="send">
        Submit
      </button>
      <textarea class="w-full h-full
            py-2 px-2
            resize-none bg-white
            border-b border-gray-400
            border-t border-gray-400
            border-l border-gray-400

            rounded-l-lg text-base
            focus:outline-none
            focus:border-slate-500"
            placeholder="Try to say something"
            id="questionInput"
            ></textarea>
    </div>
  </div>
</template>

<script>
  import { defineComponent, computed,ref } from "vue"
  import { useChatStore } from '../store'
  import { useRoute, useRouter} from 'vue-router'
  import { ActionSheet } from 'vant'


  export default defineComponent({
    props: ['id'],
    components: {
      ActionSheet
    },
    setup(props) {
      let route = useRoute()
      let store = useChatStore()
      let chat = computed(()=>store.chats.find(it=>it.id == route.params.id))

      let msgsView = ref()

      let message = computed(()=>{
        return chat.value.messages
      })

      let masks=computed(()=>store.presetMasks.concat(store.customMasks))

      function setMask(mask){
        chat.value.messages.push({
          role: 'system',
          content: mask.content
        })
        chat.value.summary = mask.title
      }


      return {
        chat,
        message,
        masks
      }
    }
  })
</script>
