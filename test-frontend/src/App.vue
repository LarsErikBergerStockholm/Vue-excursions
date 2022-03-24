<template>
  <div
    id="app"
    class="bg-gray-500 min-h-screen md:px-28 md:container md:mx-auto"
  >
    <div
      class="flex flex-col pt-3 md:flex-row md:justify-between md:container md:mx-auto"
    >
      <Header></Header>
    </div>
    <router-view></router-view>
  </div>
</template>
