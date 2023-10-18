<script setup>
  import { RouterView } from 'vue-router'
  import { ConfigProvider } from 'vant'
</script>

<template>
  <ConfigProvider class="h-full" theme="dark">
    <div class="App.vue h-full relative">
      <router-view />

    </div>

  </ConfigProvider>
</template>

<style scoped>

</style>
