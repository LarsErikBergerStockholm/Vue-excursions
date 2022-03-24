import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [],
  },
  getters: {
    itemInCart: (state) => (articleNumber) => {
      const item = state.cart.find((i) => i.articleNumber === articleNumber);
      if (item) {
        return item;
      } else {
        return null;
      }
    },
    productsInCart: (state) => {
      return state.cart;
    },
    totalQuantity: (state) => {
      return state.cart
        .reduce((a, b) => a + parseInt(b.quantity), 0)
        .toString();
    },
    cartTotal: (state) => {
      return state.cart.reduce((a, b) => a + b.price * b.quantity, 0);
    },
  },
  mutations: {
    addToCart(state, articleNumber) {
      let item = state.cart.find((i) => i.articleNumber === articleNumber);
      if (item) {
        item.quantity++;
      } else {
        state.cart.push({
          articleNumber,
          quantity: 1,
          price: Math.round(Math.random() * 200 + 50),
        });
      }
    },
    removeFromCart(state, articleNumber) {
      state.cart = state.cart.filter((i) => i.articleNumber !== articleNumber);
    },
    removeUnitFromCart(state, product) {
      let item = state.cart.find(
        (i) => i.articleNumbers === product.articleNumbers
      );
      if (item) {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          state.cart = state.cart.filter(
            (i) => i.articleNumbers !== product.articleNumbers
          );
        }
      }
    },
  },
});
