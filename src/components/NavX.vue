<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary container">
    <div class="container">
      <button class="btn btn-dark" @click="toggleView(false)">Products</button>
      <button class="btn btn-dark" @click="toggleView(true)">
        Cart ({{ cartCount }})
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    cartCount: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    toggleView(value) {
      this.$emit("toggle-view", value);
    },
  },
};
</script>
