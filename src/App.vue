<script setup>
  import {ConfigProvider} from 'vant'
  import { ref } from 'vue'
</script>

<template>
  <ConfigProvider class="h-full" theme="dark">
    <div class="App.vue h-full relative">
      <router-view>

      </router-view>

    </div>

  </ConfigProvider>
</template>

<style scoped>

</style>
