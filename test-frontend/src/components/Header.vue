<template>
  <header class="bg-white p-5 md:p-10 md:container md:mx-auto">
    <div class="flex flex-col md:flex-row md:items-center">
      <Logo></Logo>
      <div
        class="flex flex-col md:flex-row md:justify-between md:items-center md:w-full"
      >
        <Menu class="mt-2 md:mt-0 md:pl-10"></Menu>
        <div class="flex">
          <SearchField class="mr-4"></SearchField>
          <Cart class="order-first mt-2 md:mt-0 md:order-last"></Cart>
        </div>
      </div>
    </div>
  </header>
</template>
