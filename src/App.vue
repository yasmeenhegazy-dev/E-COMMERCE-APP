<template>
  <div id="app">
    <nav-bar @toggle-view="isCartActive = $event" :cartCount="cartItemCount" />

    <div class="container">
      <product-list
        v-if="!isCartActive"
        :products="products"
        @add-to-cart="addToCart"
      />
      <shopping-cart
        v-if="isCartActive"
        :cart="cart"
        @delete-from-cart="deleteFromCart"
        @increase-quantity="increaseQuantity"
        @decrease-quantity="decreaseQuantity"
      />
    </div>
  </div>
</template>

<script>
import NavBar from "./components/NavX.vue";
import ProductList from "./components/ProductListx.vue";
import ShoppingCart from "./components/ShoppingCart.vue";
import { products } from "./product.js";

export default {
  name: "App",
  components: {
    "nav-bar": NavBar,
    "product-list": ProductList,
    "shopping-cart": ShoppingCart,
  },
  data() {
    return {
      products,
      cart: [],
      isCartActive: false,
    };
  },
  computed: {
    cartItemCount() {
      return this.cart.reduce((total, item) => total + (item.quantity || 1), 0);
    },
  },
  methods: {
    addToCart(product) {
      const existingItem = this.cart.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
      // Decrease the stock
      const productInList = this.products.find((p) => p.id === product.id);
      if (productInList) {
        productInList.stock--;
      }
    },
    deleteFromCart(index) {
      const item = this.cart[index];
      // Return the quantity to stock
      const productInList = this.products.find((p) => p.id === item.id);
      if (productInList) {
        productInList.stock += item.quantity;
      }
      this.cart.splice(index, 1);
    },
    increaseQuantity(index) {
      if (!this.cart[index].quantity) {
        this.cart[index].quantity = 1;
      }
      // Decrease stock when increasing quantity
      const productInList = this.products.find(
        (p) => p.id === this.cart[index].id
      );
      if (productInList && productInList.stock > 0) {
        this.cart[index].quantity++;
        productInList.stock--;
      }
    },
    decreaseQuantity(index) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity--;
        // Return one item to stock
        const productInList = this.products.find(
          (p) => p.id === this.cart[index].id
        );
        if (productInList) {
          productInList.stock++;
        }
      } else {
        this.deleteFromCart(index);
      }
    },
  },
};
</script>
