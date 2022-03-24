<template>
  <div>
    <CartButton @click.native="isOpen = true" />
    <CModal v-if="isOpen" @close="isOpen = false">
      <template #body>
        <h1 class="text-4xl font-bold mb-10">Din varukorg</h1>
        <div class="flex flex-col text-gray-800 bg-white drop-shadow-md">
          <table class="w-full text-sm md:text-base">
            <thead>
              <tr class="h-12">
                <th class="hidden md:table-cell"></th>
                <th class="text-left">Produkt</th>
                <th class="text-left">
                  <span>Antal</span>
                </th>
                <th class="hidden text-left md:table-cell">Pris styck</th>
                <th class="text-left">Totalt</th>
              </tr>
            </thead>
            <tbody>
              <CartRow
                v-for="product in products"
                :key="product.id"
                :product="product"
                @remove="removeFromCart($event)"
              ></CartRow>
            </tbody>
          </table>
          <hr class="pb-6 mt-6" />
          <div class="w-full my-4 mt-6 -mx-2">
            <div class="md:px-2">
              <div class="p-4">
                <h1 class="ml-2 font-extrabold uppercase">Din order</h1>
              </div>
              <div class="p-4">
                <div class="flex justify-between border-b">
                  <div
                    class="md:px-4 md:py-2 m-2 text-md font-bold text-center text-gray-800"
                  >
                    Belopp
                  </div>
                  <div
                    class="md:px-4 md:py-2 m-2 md:text-md font-bold text-center text-gray-900"
                  >
                    {{ totalAmount }} kr
                  </div>
                </div>
                <div class="flex justify-between pt-4 border-b">
                  <div
                    class="md:px-4 md:py-2 m-2 font-bold text-center text-gray-800"
                  >
                    Moms
                  </div>
                  <div
                    class="md:px-4 md:py-2 m-2 font-bold text-center text-gray-900"
                  >
                    {{ vat }} Kr
                  </div>
                </div>
                <div class="flex justify-between pt-4 border-b">
                  <div
                    class="md:px-4 md:py-2 m-2 font-extrabold text-center text-gray-800"
                  >
                    Att betala
                  </div>
                  <div
                    class="md:px-4 md:py-2 m-2 font-extrabold text-center text-gray-900"
                  >
                    {{ totalAmountIncVat }} Kr
                  </div>
                </div>
                <button
                  class="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none md:mt-11"
                >
                  <svg
                    aria-hidden="true"
                    data-prefix="far"
                    data-icon="credit-card"
                    class="w-8"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="currentColor"
                      d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z"
                    />
                  </svg>
                  <span class="ml-2 mt-10px">Gå till kassan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </CModal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      products: [],
    };
  },
  watch: {
    isOpen: async function () {
      if (!this.isOpen || this.$store.getters.productsInCart.length === 0) {
        return;
      }
      const body = {
        articleNumbers: this.getArticleNumbers(
          this.$store.getters.productsInCart
        ),
      };
      try {
        const response = await this.$http.post(
          "https://xxx.se/variants/search",
          body
        );
        this.products = response.data;
      } catch (err) {
        console.log(err);
      }
    },
  },
  methods: {
    getArticleNumbers(cartItems) {
      return cartItems.map((number) => number.articleNumber);
    },
    removeFromCart(articleNumber) {
      this.products = this.products.filter(
        (product) => product.articleNumber !== articleNumber
      );
      this.$store.commit("removeFromCart", articleNumber);
    },
  },
  computed: {
    totalAmount() {
      return this.$store.getters.cartTotal.toFixed(2);
    },
    vat() {
      return (this.$store.getters.cartTotal * 0.25).toFixed(2);
    },
    totalAmountIncVat() {
      return (this.$store.getters.cartTotal * 1.25).toFixed(2);
    },
  },
};
</script>

<style scoped>
::v-deep .c-modal {
  @apply w-full;
}

@screen md {
  ::v-deep .c-modal {
    width: 600px;
  }
}
</style>
