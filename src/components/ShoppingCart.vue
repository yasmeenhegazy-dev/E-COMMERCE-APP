<template>
  <div class="container">
    <div class="alert alert-warning mt-3" v-if="cart.length === 0">
      Your cart is empty. Add some products!
    </div>

    <div v-if="cart.length !== 0">
      <table class="table table-bordered table-hover table-striped mt-5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Controls</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in cart" :key="index">
            <td>{{ item.id }}</td>
            <td>{{ item.title }}</td>
            <td>
              <img
                :src="item.image"
                style="width: 60px; height: 60px; object-fit: cover"
              />
            </td>
            <td>${{ item.price }}</td>
            <td>
              <div class="btn-group">
                <button
                  class="btn btn-sm btn-secondary"
                  @click="$emit('decrease-quantity', index)"
                >
                  -
                </button>
                <span class="btn btn-sm btn-light">{{
                  item.quantity || 1
                }}</span>
                <button
                  class="btn btn-sm btn-secondary"
                  @click="$emit('increase-quantity', index)"
                >
                  +
                </button>
              </div>
            </td>
            <td>${{ (item.price * (item.quantity || 1)).toFixed(2) }}</td>
            <td>
              <button
                class="btn btn-danger btn-sm"
                @click="confirmDelete(index)"
                title="Remove from cart"
              >
                <i class="bi bi-trash"></i> Remove
              </button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="5" class="text-end"><strong>Total:</strong></td>
            <td colspan="2">
              <strong>${{ cartTotal.toFixed(2) }}</strong>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>

    <div class="modal fade" id="deleteConfirmModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirm Removal</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            Are you sure you want to remove this item from your cart?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="button" class="btn btn-danger" @click="deleteItem">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";

export default {
  name: "ShoppingCart",
  props: {
    cart: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      itemToDelete: null,
      modal: null,
    };
  },
  computed: {
    cartTotal() {
      return this.cart.reduce((total, item) => {
        return total + item.price * (item.quantity || 1);
      }, 0);
    },
  },
  mounted() {
    this.modal = new Modal(document.getElementById("deleteConfirmModal"));
  },
  methods: {
    confirmDelete(index) {
      this.itemToDelete = index;
      this.modal.show();
    },
    deleteItem() {
      if (this.itemToDelete !== null) {
        this.$emit("delete-from-cart", this.itemToDelete);
        this.modal.hide();
        this.itemToDelete = null;
      }
    },
  },
};
</script>

<style scoped>
.btn-danger {
  transition: all 0.3s ease;
}
.btn-danger:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
</style>
