<template>
<div class="md:container sm  h-screen md:mx-auto sm flex flex-col-reverse ">

<div id="inputField" class="w-full flex flex-row-reverse bg-transparent">
  <button class=" py-0 px-4
              w-24
              bg-sky-500/100 rounded-r-lg
              text-md text-white font-semibold
              hover:bg-blue-700 focus:outline-none
              focus:ring-2 focus:ring-blue-400
              focus:ring-opacity-75
              "
              id="submit">
  Submit</button>
<textarea class="w-full h-full
                  py-2 px-2
                  resize-none bg-white
                  border-b border-gray-400
                  border-t border-gray-400
                  border-l border-gray-400

                  rounded-l-lg text-base
                  focus:outline-none
                  focus:border-slate-500"
                  placeholder="question"
                  id="questionInput"
                  ></textarea>
</div>

<div id="talkField" class="w-full h-full  bg-slate-900 flex flex-col rounded">

</div>

<div id="title" class="w-full bg-slate-700">
  <h1 class="text-white font-semibold mx-2">
    CheatGpt
  </h1>
  <h5 class="mx-2 mb-2 text-slate-400 text-xs">gpt-3.5-turbo</h5>
</div>
</div>
</template>
