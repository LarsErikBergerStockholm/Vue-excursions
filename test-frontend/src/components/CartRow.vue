<template>
  <tr>
    <td class="hidden pb-4 md:table-cell">
      <img :src="getImage" alt="Product image" class="w-20" />
    </td>
    <td>
      <p class="mb-2">{{ product.name }}</p>
      <button
        @click="$emit('remove', product.articleNumber)"
        class="text-gray-700"
      >
        <svg
          aria-hidden="true"
          data-prefix="far"
          data-icon="trash-alt"
          class="w-4 text-red-600 hover:text-red-800"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M268 416h24a12 12 0 0012-12V188a12 12 0 00-12-12h-24a12 12 0 00-12 12v216a12 12 0 0012 12zM432 80h-82.41l-34-56.7A48 48 0 00274.41 0H173.59a48 48 0 00-41.16 23.3L98.41 80H16A16 16 0 000 96v16a16 16 0 0016 16h16v336a48 48 0 0048 48h288a48 48 0 0048-48V128h16a16 16 0 0016-16V96a16 16 0 00-16-16zM171.84 50.91A6 6 0 01177 48h94a6 6 0 015.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0012-12V188a12 12 0 00-12-12h-24a12 12 0 00-12 12v216a12 12 0 0012 12z"
          />
        </svg>
        <small>Ta bort produkt</small>
      </button>
    </td>
    <td class="text-left">
      <span class="text-sm md:text-base font-medium">{{
        cartItem.quantity
      }}</span>
    </td>
    <td class="hidden text-left md:table-cell">
      <span class="text-sm md:text-base font-medium"
        >{{ cartItem.price }} kr</span
      >
    </td>
    <td class="text-left">
      <span class="text-sm md:text-base font-medium"
        >{{ cartItem.quantity * cartItem.price }} kr</span
      >
    </td>
  </tr>
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
    return {};
  },
  computed: {
    getImage() {
      if (!this.product.images.length) {
        return ["../assets/fallback.png"];
      }
      return `${this.product.images[0].assetUrl}?w=${this.imageSize}`;
    },
    imageSize() {
      return 80;
    },
    cartItem() {
      return this.$store.getters.itemInCart(this.product.articleNumber);
    },
  },
};
</script>

<style></style>
