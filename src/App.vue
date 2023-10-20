<script setup>
  import { RouterView } from 'vue-router'
  import { ConfigProvider } from 'vant'
</script>

<template>
  <ConfigProvider class="h-full" theme="dark">
    <div class="App.vue h-full relative max-h-screen flex flex-col rounded-md">
      <router-view />

    </div>

  </ConfigProvider>
</template>

<style>
html::-webkit-scrollbar {
  width: 10px;
}

html::-webkit-scrollbar-track {
  background-color: rgb(31, 28, 28);
}

html::-webkit-scrollbar-thumb {
  background: #434141;
  border-radius: 25px;
}

</style>
