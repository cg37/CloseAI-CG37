<script setup>
  import { useRouter } from "vue-router"
  import { useChatStore } from "../store";
  let store = useChatStore()
  let router = useRouter()

  function addChat(){
    let id = store.addChat()
    router.push('/chat/' + id)
  }
</script>

<script>
  export default {
    updated(){
      console.log('ChatListView updated')
    }
  }
</script>

<template class="flex flex-col grow">
    <div class="w-full max-h-screen grow">
      <h1 class="title w-full h-14 justify-center items-center flex border-b text-white text-2xl">
        AI-Chat
      </h1>
      <ul class="divide-y divide-white grow overflow-y-auto max-h-full">
        <li v-for="chat of store.chats.toReversed()" :key="chat.id" class="flex active:bg-slate-700 bg-slate-700 border-t">
          <router-link :to="'/chat/'+chat.id" class="flex gap-1 grow overflow-hidden">
            <img class="w-10 h-10 m-1 rounded" src="../pic/tzxl.jpg" alt="一个头像">
            <div class="flex flex-col justify-center overflow-hidden">
              <span class="text-white">
                {{ chat.summary || "New Chat" }}
              </span>
              <span class="text-xs text-grey-500 truncate max-w-full text-white">
                {{ chat.messages.at(-1)?.content }}
              </span>
            </div>
          </router-link>
          <span class="self-center justify-center text-white items-center flex cursor-pointer h-12 w-12 hover:bg-slate-600 shrink-0" @click="store.deleteChat(chat.id)">
            ❌
          </span>
        </li>

      </ul>
      <span class="absolute bottom-20 right-10 bg-emerald-600	float-right float-bottom  flex rounded-full self-center justify-center text-white text-6xl items-center cursor-pointer h-12 w-12 hover:bg-emerald-300 shrink-0"
            @click="addChat">
        +
      </span>
    </div>

</template>


