<template>
  <div class="z-10 left-80 top-20">
    <div class="w-20 md:pl-0">
      <CButton
        @click="setMenuIsShowing"
        variant="primary"
        size="small"
        color="charcoal"
      >
        <span>Produkter</span>
      </CButton>
    </div>
    <div v-if="isMenuShowing" class="md:absolute md:flex md:flex-row">
      <ul>
        <li
          class="flex items-center justify-between p-4 border-solid border-b-2 border-gray-500 bg-white filter drop-shadow-md cursor-pointer font-bold md:w-80"
          v-for="catalog in catalogs"
          :key="catalog.id"
          @click="selectCategory(catalog)"
        >
          {{ catalog.name }}
          <CIcon name="navigation-arrow" color="charcoal" :dynamic-size="12" />
        </li>
      </ul>

      <div v-if="selectedCategory" class="filter drop-shadow-md md:w-80">
        <div class="bg-white w-30 py-5 pl-8 md:pl-3">
          <router-link :to="'/kategorier/' + this.selectedCategory.slug">
            <CButton
              @click="setMenuIsShowing"
              variant="primary"
              size="small"
              color="charcoal"
            >
              <span>Visa alla produkter</span>
            </CButton>
          </router-link>
        </div>

        <ul>
          <li
            class="p-4 border-solid border-b-2 border-gray-500 bg-white cursor-pointer"
            v-for="childCategory in selectedCategory.children"
            :key="childCategory.name"
          >
            <router-link
              :to="'/kategorier/' + childCategory.slug"
              @click.native="hideMenu"
              >{{ childCategory.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMenuShowing: false,
      selectedCategory: undefined,
      catalogs: [],
    };
  },
  methods: {
    selectCategory(catalog) {
      if (catalog === this.selectedCategory) {
        this.selectedCategory = undefined;
      } else {
        this.selectedCategory = catalog;
      }
    },
    setMenuIsShowing() {
      this.isMenuShowing = !this.isMenuShowing;
    },
    hideMenu() {
      this.isMenuShowing = false;
    },
  },
  async created() {
    try {
      const response = await this.$http.get(
        "https://xxx.se/product/menu/"
      );
      this.catalogs = response.data;
    } catch (err) {
      console.log(err);
    }
  },
};
</script>
