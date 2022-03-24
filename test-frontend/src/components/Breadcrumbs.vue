<template>
  <div
    class="flex overflow-x-auto items-center font-bold mb-4 space-x-2 md:space-x-3"
  >
    <router-link :to="'/'">Start</router-link>
    <CIcon
      name="navigation-arrow"
      :dynamicSize="8"
      color="charcoal"
      class="flex-shrink-0"
    />
    <div class="flex flex-shrink-0 space-x-2 md:space-x-3">
      <router-link
        class="flex items-center space-x-2 md:space-x-3"
        :to="{ name: 'Plp', params: { slug: breadcrumb.slug } }"
        v-for="breadcrumb in breadcrumbs.parents"
        :key="breadcrumb.name"
      >
        <div>
          {{ breadcrumb.name }}
        </div>
        <CIcon name="navigation-arrow" :dynamicSize="8" color="charcoal" />
      </router-link>
    </div>
    <div class="flex-shrink-0">
      {{ breadcrumbs.name }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    breadcrumbs: {
      type: Object,
      required: true,
    },
  },
};
</script>
