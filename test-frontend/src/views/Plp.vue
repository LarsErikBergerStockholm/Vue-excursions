<template>
  <div class="mt-2">
    <div class="m-4">
      <Breadcrumbs :breadcrumbs="breadcrumbs"></Breadcrumbs>
      <div class="lg:hidden">
        <CButton
          variant="primary"
          size="small"
          color="charcoal"
          @click.native="toggleFilters()"
        >
          <span>Filtrera</span>
        </CButton>
      </div>
    </div>
    <div class="flex">
      <div v-if="isFiltersVisable || !isMobile" class="mt-6 mr-9">
        <div v-for="(facet, index) in facets" :key="index">
          <Facets :facet="facet" @change="updateFacets($event)"></Facets>
        </div>
      </div>

      <div class="ml-4">
        <h1
          v-if="breadcrumbs.name"
          class="my-6 text-2xl font-bold md:mb-10 md:text-4xl"
        >
          {{ breadcrumbs.name }}
        </h1>
        <div
          class="mb-10 md:flex md:flex-col"
          v-for="(product, index) in products"
          :key="index"
        >
          <ProductTile :product="product"></ProductTile>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slug: this.$route.params.slug,
      products: [],
      facets: [],
      isLoading: false,
      currentProductCount: 0,
      totalProductCount: 0,
      breadcrumbs: {},
      isFiltersVisable: false,
      windowWidth: window.innerWidth,
      selectedFacets: {},
    };
  },

  computed: {
    isMobile() {
      if (this.windowWidth <= 768) {
        return true;
      }
      return false;
    },
  },

  watch: {
    $route() {
      this.getBreadcrumbs();
    },
  },
  mounted() {
    window.addEventListener("scroll", this.getMoreProducts);

    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.getMoreProducts);
  },

  methods: {
    updateFacets(event) {
      if (event.isChecked === true) {
        if (!this.selectedFacets[event.name]) {
          this.selectedFacets[event.name] = [];
        }
        this.selectedFacets[event.name].push(event.value);
      } else {
        for (var i = 0; i < this.selectedFacets[event.name].length; i++) {
          if (this.selectedFacets[event.name][i] === event.value) {
            this.selectedFacets[event.name].splice(i, 1);
          }
        }
      }

      if (!this.selectedFacets[event.name].length) {
        delete this.selectedFacets[event.name];
      }
      this.products = [];
      this.getProducts();
    },

    async getProducts(currentProductCount = 0) {
      const finalFacetsAndValues = Object.keys(this.selectedFacets).map(
        (key) => ({
          attributeName: key,
          name: key,
          selected: this.selectedFacets[key],
          type: "distinct",
        })
      );
      this.isLoading = true;
      const body = {
        attribute: {
          name: "splitCategoryPaths",
          value: this.slug,
        },
        resultsOptions: {
          facets: finalFacetsAndValues,
          skip: currentProductCount,
          take: 10,
        },
      };

      const data = {
        resultsOptions: body.resultsOptions,
        attribute: body.attribute,
      };

      try {
        const response = await this.$http.post(
          "https://xxx.54proxy.com/getEntitiesByAttribute",
          data,
          {
            headers: {
              "Content-Type": "application/json",
              "api-version": "V3",
              "user-id": "something",
            },
          }
        );
        const { items, count, facets } = response.data.results;
        const { facetEntitiesData } = response.data.customData;

        for (const item of items) {
          const productAttribute = item.attributes.find(
            (elm) => elm.name === "product"
          );
          if (productAttribute?.values.length > 0) {
            const product = JSON.parse(productAttribute.values[0]);
            this.products.push(product);
          }
        }

        facets.forEach((facet) => {
          const match = facetEntitiesData.find(
            (elm) => elm.key.id === facet.name
          );
          const attribute = match.key.attributes.find(
            (elm) => elm.name === "FacetattributeLabel"
          );
          facet.label = attribute.values[0];
        });
        this.currentProductCount = this.products.length;
        this.totalProductCount = count;
        this.facets = facets;
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },

    getMoreProducts() {
      const maxScroll =
        window.pageYOffset + window.innerHeight >
        document.documentElement.scrollHeight * 0.85;

      const allProductsLoaded =
        this.currentProductCount === this.totalProductCount;

      if (maxScroll && !allProductsLoaded && !this.isLoading) {
        this.getProducts(this.currentProductCount);
      }
    },

    async getBreadcrumbs() {
      try {
        const response = await this.$http.get(
          `https://xxx.se/product/breadcrumbs/${this.slug}`
        );
        this.breadcrumbs = response.data;
      } catch (err) {
        console.log(err);
      }
    },
    toggleFilters() {
      this.isFiltersVisable = !this.isFiltersVisable;
    },
  },

  beforeRouteUpdate(to, from, next) {
    this.products = [];
    this.slug = to.params.slug;
    this.getProducts();
    next();
  },
  async created() {
    this.getProducts();
    this.getBreadcrumbs();
  },
};
</script>
