<template>
  <div class="MainView.vue absolute w-full h-full border bg-slate-900 flex flex-col rounded-lg">
    <router-view />
    <div class="flex border-t border-white divide-x divide-slate-900 gap-x-px ">
      <router-link class="flex flex-col justify-center items-center text-white text-9xl grow w-0 h-14 [&.router-link-exact-active]:text-green-500" to="/">
        <span class="text-lg">Chat</span>
      </router-link>

      <router-link class="flex flex-col justify-center items-center text-white text-9xl grow w-0 h-14 [&.router-link-exact-active]:text-green-500" to="/masks">
        <span class="text-lg">Masks</span>
      </router-link>

      <router-link class="flex flex-col justify-center items-center text-white text-9xl grow w-0 h-14 [&.router-link-exact-active]:text-green-500" to="/me">
        <span class="text-lg">Settings</span>
      </router-link>
    </div>
  </div>
</template>
