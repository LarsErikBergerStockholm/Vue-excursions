<template>
  <div class="mt-2">
    <Breadcrumbs :breadcrumbs="breadcrumbs"></Breadcrumbs>
    <div class="p-5 bg-white filter drop-shadow-md md:flex md:p-10 md:mt-36">
      <div class="md:pr-14 md:flex-1">
        <div
          class="flex flex-nowrap overflow-x-auto space-x-4"
          id="product-images"
        >
          <template v-for="(image, index) in getImages">
            <img :key="index" :src="image" alt="Product image" class="w-96" />
          </template>
        </div>
      </div>
      <div class="md:pr-14 md:flex-1">
        <div class="flex justify-between mt-2 md:mt-0">
          <h2 class="font-bold md:pt-0">
            {{ product.name }}
          </h2>
          <div class="flex mt-1">
            <span class="text-xs">Art.nr:</span
            ><span class="text-xs font-bold ml-1"> {{ getArticleNumber }}</span>
          </div>
        </div>
        <h2 class="mt-9 font-bold">Produktbeskrivning</h2>
        <p class="mt-3 text-sm">{{ product.text }}</p>
        <div class="w-20 mt-6">
          <CButton @click="addToCart()" variant="cta-squared" size="small">
            <span>Köp</span>
          </CButton>
        </div>
      </div>
      <div class="mt-9 md:mt-0 md:flex-1">
        <h2 class="font-bold">Teknisk specifikation</h2>
        <ul class="mt-3">
          <li
            class="flex justify-between inline-block border-b border-gray-500 py-1.5 text-xs"
            v-for="(attribute, index) in product.commonVariantAttributes"
            :key="index"
          >
            <span
              >{{ attribute.attributeLabel || attribute.attributeName }}:</span
            >
            <span class="font-bold">{{ getAttributeValues(attribute) }}</span>
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
      slug: this.$route.params.slug,
      product: {},
      breadcrumbs: {},
    };
  },
  watch: {
    $route() {
      this.getBreadcrumbs();
    },
  },
  methods: {
    getAttributeValues(attribute) {
      if (attribute.unit) {
        return `${attribute.attributeValue} ${attribute.unit}`;
      }
      return attribute.attributeValue;
    },
    addToCart() {
      this.$store.commit("addToCart", this.product.variants[0].articleNumber);
    },
    async getBreadcrumbs() {
      try {
        const response = await this.$http.get(
          `https://xxx.se/product/breadcrumbs/${this.product.categoryPaths[0]}`
        );
        this.breadcrumbs = response.data;

        this.breadcrumbs.parents.push({
          name: this.breadcrumbs.name,
          slug: this.breadcrumbs.slug,
        });

        this.breadcrumbs.name = this.product.name;
        this.breadcrumbs.slug = undefined;
      } catch (err) {
        console.log(err);
      }
    },
  },

  async created() {
    try {
      const response = await this.$http.get(
        "https://xxx.se/product/products/" +
          this.slug
      );
      this.product = response.data;
    } catch (err) {
      console.log(err);
    }
    this.getBreadcrumbs();
  },
  computed: {
    ImageSize() {
      return 392;
    },
    getImages() {
      if (!this.product.variants) {
        return ["../assets/fallback.png"];
      }
      return this.product.variants[0].images.map(
        (image) => `${image.assetUrl}?w=${this.ImageSize}`
      );
    },
    getArticleNumber() {
      if (!this.product.variants) {
        return "";
      }
      return this.product.variants[0].articleNumber;
    },
  },
};
</script>
<style scoped>
@screen md {
  #product-images::-webkit-scrollbar {
    @apply bg-gray-300;
  }
  #product-images::-webkit-scrollbar-thumb {
    @apply bg-gray-700;
  }
}
</style>
