<script setup lang="ts">
import { useFetch } from "../../../utils/useFetch";
import { EHttpMethods } from "../../../utils/types";
import { APP_API_URL } from "../../../utils/constants";
import { ref, onMounted } from "vue";
import type { IProduct } from "./../products.types";
import { RouterLink } from "vue-router";
const props = defineProps({
  productId: {
    type: String,
    required: true,
  },
});

const specificProduct = ref<IProduct | null>(null);
const isProductLoading = ref<boolean>(false);

onMounted(async () => {
  isProductLoading.value = true;
  try {
    const response = await useFetch<{ product: IProduct }>(
      `${APP_API_URL}/product/${props.productId}`,
      {
        method: EHttpMethods.GET,
      }
    );
    if (response.product) {
      specificProduct.value = response.product;
    }
  } catch (error) {
    console.log(error);
  } finally {
    isProductLoading.value = false;
  }
});
</script>
<template>
  <div class="text-center" v-if="isProductLoading">Loading...</div>
  <div v-else-if="specificProduct">
    <div class="mx-auto card text-center" style="width: 25rem">
      <img
        :src="specificProduct.imageUrl"
        class="card-img-top"
        :alt="specificProduct.product_name"
      />
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <h4 class="card-text">
          {{ specificProduct.product_name }} - {{ specificProduct.price }}$
        </h4>
        <span class="card-text">
          <b>Description</b>:
          {{ specificProduct.description }}
        </span>
        <div class="mt-2">
          <RouterLink to="/product/list" class="btn btn-dark px-5">
            Detail
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="d-flex flex-column align-items-center">
      <p class="fs-3">
        <span class="text-danger">Ops!</span> Product not found.
      </p>
      <p class="lead">Seems that the product does not exist.</p>
      <div class="d-flex gap-3">
        <RouterLink to="/" class="btn btn-dark">Go back to Home</RouterLink>
        <RouterLink to="/product/list" class="btn btn-dark"
          >Go back to List</RouterLink
        >
      </div>
    </div>
  </div>
</template>
