require(`@xxx-js/xxx-styles/dist/xxx-styles.css`);

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import Axios from "axios";
import Menu from "./components/Menu";
import ProductTile from "./components/ProductTile";
import CartButton from "./components/CartButton";
import Cart from "./components/Cart";
import CartRow from "./components/CartRow";
import Header from "./components/Header";
import Logo from "./components/Logo";
import Breadcrumbs from "./components/Breadcrumbs";
import Hero from "./components/Hero";
import Facets from "./components/Facets";
import PlusIcon from "./components/PlusIcon";
import MinusIcon from "./components/MinusIcon";
import SearchField from "./components/SearchField";

Vue.use(xxx);

Vue.component("Menu", Menu);
Vue.component("ProductTile", ProductTile);
Vue.component("CartButton", CartButton);
Vue.component("Cart", Cart);
Vue.component("CartRow", CartRow);
Vue.component("Header", Header);
Vue.component("Logo", Logo);
Vue.component("Breadcrumbs", Breadcrumbs);
Vue.component("Hero", Hero);
Vue.component("Facets", Facets);
Vue.component("PlusIcon", PlusIcon);
Vue.component("MinusIcon", MinusIcon);
Vue.component("SearchField", SearchField);

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
