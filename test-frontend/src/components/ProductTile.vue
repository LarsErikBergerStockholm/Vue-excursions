<template>
  <router-link :to="'/produkt/' + this.product.variants[0].variantSlug">
    <div class="p-5 bg-white filter drop-shadow-md md:flex md:p-8">
      <img :src="getImage" alt="Product image" class="w-full md:w-52" />
      <div class="md:flex md:flex-col md:ml-6">
        <div class="md:flex md:justify-between">
          <h1 class="font-bold underline cursor-pointer pt-3 md:pt-0">
            {{ product.name }}
          </h1>
          <CButton
            @click.prevent="addToCart()"
            variant="cta-squared"
            size="small"
            class="mt-5 md:mt-0"
          >
            <span>Köp</span>
          </CButton>
        </div>
        <p class="mt-3 max-w-lg">{{ product.text }}</p>
        <ul class="mt-9">
          <li
            class="inline-block"
            v-for="(attribute, index) in product.commonVariantAttributes"
            :key="index"
          >
            <span
              >{{ attribute.attributeLabel || attribute.attributeName }}:</span
            >
            <span class="font-bold px-2 border-r mr-2">{{
              getAttributeValues(attribute)
            }}</span>
          </li>
        </ul>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      slug: this.$route.params.slug,
    };
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
  },
  computed: {
    getImage() {
      if (!this.product.images.length) {
        return ["../assets/fallback.png"];
      }
      return `${this.product.images[0].assetUrl}?w=${this.imageSize}`;
    },
    imageSize() {
      return 208;
    },
  },
};
</script>
