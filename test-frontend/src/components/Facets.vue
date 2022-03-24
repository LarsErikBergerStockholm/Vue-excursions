<template>
  <div class="px-5 py-3 bg-white w-72">
    <div
      class="flex justify-between items-center mb-1"
      @click="toggleFilters()"
    >
      <span class="font-bold">
        {{ facet.label }}
      </span>
      <MinusIcon v-if="isFiltersExpanded" />
      <PlusIcon v-else />
    </div>
    <div v-if="isFiltersExpanded" :class="computedClass" id="filters">
      <div
        v-for="(item, index) in facet.items"
        :key="index"
        class="flex justify-between items-center mb-3"
      >
        <CCheckbox
          :checked="item.selected"
          @input="
            $emit('change', {
              isChecked: $event,
              value: item.item,
              name: facet.name,
            })
          "
        >
          {{ item.item }}
        </CCheckbox>
        <span>{{ item.count }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    facet: {
      default: () => {},
      type: Object,
    },
  },
  data() {
    return {
      isFiltersExpanded: false,
    };
  },
  methods: {
    toggleFilters() {
      this.isFiltersExpanded = !this.isFiltersExpanded;
    },
  },
  computed: {
    computedClass() {
      let style = "";
      if (this.facet.items.length > 10) {
        style = "h-64 overflow-x-auto pr-3 mt-3";
      } else {
        style = "h-auto pr-3 mt-3";
      }
      return style;
    },
  },
};
</script>

<style scoped>
@screen md {
  #filters::-webkit-scrollbar {
    @apply bg-gray-300 w-3;
  }
  #filters::-webkit-scrollbar-thumb {
    @apply bg-gray-700;
  }
}
</style>
