

<template>
  <div class="flex flex-col h-full overflow-hidden bg-slate-900">
    <h1 class="title w-full h-14 justify-center items-center flex border-b text-white text-2xl">
      <router-link class="absolute left-0 h-full px-2 justify-center items-center flex" to="/">返回</router-link>
      <span>{{ chat.summary || 'New Chat' }}</span>
    </h1>

    <div ref="msgsView" @touchmove="setAutoScroll" @mousewheel="setAutoScroll" class="grow bg-zinc-900 p-2 space-y-2 overflow-auto">
      <template v-if="messages.length === 0">
        <h2 class="mx-auto text-white text-center">选择面具</h2>
        <div class="space-y-2">
            <div class="flex flex-col border rounded-lg p-2 text-white" v-for="mask of masks" @click="setMask(mask)">
              <h3 class="font-bold text-xl">{{ mask.title }}</h3>
              <div class="line-clamp-3">{{ mask.content }}</div>
            </div>
        </div>
      </template>
      <template v-else>
        <h2 class="mx-auto text-white text-center">start chat</h2>

        <div v-for="(msg, idx) of messages" :key="idx" :class="'msg-' + msg.role" class="[&.msg-assistang]:mr-4 [&.msg-user]:ml-4 [&.msg-system]:ml-4 group">
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
            @keyup.enter.ctrl="send" v-model="userInput"
            ></textarea>
    </div>
  </div>
</template>

<script>
  import { defineComponent, computed, ref, nextTick, onMounted } from "vue"
  import { useChatStore } from '../store'
  import { useRoute, useRouter} from 'vue-router'
  import { ActionSheet } from 'vant'
  import { getAnswerStream2, getSummary} from "../chatgpt-api.js"


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

      let autoScroll = ref(true)

      let messages = computed(()=>{
        return chat.value.messages
      })

      let masks=computed(()=>store.presetMasks.concat(store.customMasks))

      onMounted(()=> {
        msgsView.value.scrollTo(0, 99999)
      })

      function setAutoScroll(){
        let el = msgsView.value
        if (Math.abs(el.offsetHeight + el.scrollTop - el.scrollHeight) <= 10) {
          autoScroll.value = true
        } else {
          autoScroll.value = false
        }
      }



      function setMask(mask){
        chat.value.messages.push({
          role: 'system',
          content: mask.content
        })
        chat.value.summary = mask.title
      }

      let userInput = ref('')

      async function send(){
        if (userInput.value == '') {
          return
        }
        chat.value.messages.push({
          role: "user",
          content: userInput.value
        })

        userInput.value = ''

        await nextTick()
        msgsView.value.scrollTo(0,99999)

        autoScroll.value = true

        let answerObj = {
          role: "assistant",
          content: ''
        }

        chat.value.messages.push(answerObj)
        let proxiedAnswerObj = chat.value.messages.at(-1)

        await getAnswerStream2(messages.value, async token => {
          proxiedAnswerObj.content = proxiedAnswerObj + token

          if (autoScroll.value) {
            await nextTick()
            msgsView.value.scrollTo(0, 99999)
          }
        })

        if (!chat.value.summary || chat.value.summary === "new Chat") {
          chat.value.summary = await getSummary(chat.value.messages)
        }
      }

      return {
        chat,
        messages,
        masks,
        userInput,
        msgsView,
        store,
        send,
        setAutoScroll,
        setMask
      }
    }
  })
</script>
