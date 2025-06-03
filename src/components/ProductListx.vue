<template>
  <div class="row mt-5">
    <div class="col col-4" v-for="product in products" :key="product.id">
      <div class="card mt-4" style="width: 18rem">
        <img
          :src="product.image"
          class="card-img-top"
          style="width: 100%; height: 250px; object-fit: contain; padding: 10px"
        />
        <div class="card-body">
          <h5 class="card-title">{{ product.title }}</h5>
          <p class="card-text">{{ product.description }}</p>
          <p class="card-text">
            <strong>Price: ${{ product.price }}</strong>
          </p>
          <button
            class="btn btn-primary"
            @click="$emit('add-to-cart', product)"
            :disabled="product.stock === 0"
          >
            {{ product.stock === 0 ? "Out of Stock" : "Add To Cart" }}
          </button>
          <div class="btn btn-dark ms-3">Stock: {{ product.stock }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
};
</script>
