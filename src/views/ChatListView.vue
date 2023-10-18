<template>
  <div class="h-full flex flex-col">
    <h1 class="title w-full h-14 justify-center items-center flex border-b text-white text-2xl">
        AI-Chat
    </h1>
    <ul class="divide-y divide-white grow voerflow">
      <li v-for="chat of store.chats.toReversed()" :key="chat.id" class="flex active:bg-slate-700">
        <router-link :to="'/chat/'+chat.id" class="felx gap-1 grow overflow-hidden">

        </router-link>
      </li>

    </ul>

  </div>
</template>

<script setup>
  import { useRouter } from "vue-router"
  import { useChatStore } from "../store";
  var store = useChatStore
  var router = useRouter
  debugger;

  function addChat(){
    let id = store.addChat()
    router.push('/chat' + id)
  }
</script>

<script>
  export default {
    updated(){
      console.log('ChatListView updated')
    }
  }
</script>
