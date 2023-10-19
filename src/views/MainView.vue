<template class="MainView.vue absolute w-full border flex flex-col max-h-screen rounded-lg">

  <router-view />
  <div class="flex border-t border-white divide-x gap-x-px rounded-b-lg	">
    <router-link class="flex flex-col justify-center bg-slate-900 items-center rounded-bl-lg text-white text-9xl grow w-0 h-14 [&.router-link-exact-active]:text-green-500" to="/">
      <span class="text-lg">Chat</span>
    </router-link>
    <router-link class="flex flex-col justify-center bg-slate-900 items-center text-white text-9xl grow w-0 h-14 [&.router-link-exact-active]:text-green-500" to="/masks">
      <span class="text-lg">Masks</span>
    </router-link>
    <router-link class="flex flex-col justify-center bg-slate-900 items-center rounded-br-lg text-white text-9xl grow w-0 h-14 [&.router-link-exact-active]:text-green-500" to="/settings">
      <span class="text-lg">Settings</span>
    </router-link>
  </div>
</template>
