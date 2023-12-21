<script setup lang="ts">
import { useFetch } from "../../../utils/useFetch";
import { EHttpMethods } from "../../../utils/types";
import type { IProduct } from "./../products.types";
import { ref, onMounted } from "vue";
import { APP_API_URL } from "../../../utils/constants";
import { RouterLink } from "vue-router";

const products = ref<IProduct[]>([]);
const requestError = ref<string | null>(null);
const showErrorMessage = ref<boolean>(false);

onMounted(async () => {
  const response = await useFetch<IProduct[]>(`${APP_API_URL}/products`, {
    method: EHttpMethods.GET,
  });
  if (response.data) {
    products.value = response.data;
  } else if (response.error) {
    requestError.value = response.error;
    showErrorMessage.value = true;
  }
});
</script>

<template>
  <div class="mx-3">
    <div class="d-flex justify-content-between align-items-center">
      <h2>Product list</h2>
      <RouterLink to="/product-add" class="btn btn-dark">
        Add product
      </RouterLink>
    </div>
  </div>
  <div v-if="products.length" class="container">
    <div class="col-12">
      <div class="row">
        <div
          v-for="product in products"
          :key="product.id"
          class="grid__item col-xl-4 col-md-6 col-xs-12"
        >
          <div class="card text-center">
            <img
              class="card__img"
              :src="product.imageUrl"
              :alt="product.product_name"
            />
            <div class="card__content">
              <h1 class="card__header">{{ product.product_name }}</h1>
              <RouterLink :to="`/product/${product.id}`" class="card__btn">
                Product detail <span>&rarr;</span>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="container">
      <div class="col-12">
        <div class="row">
          <div class="col-12">
            <h2 class="text-center">No products found</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="showErrorMessage"
    class="alert alert-danger alert-message"
    role="alert"
  >
    <span class="d-flex align-items-center gap-2">
      {{ requestError }}

      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        @click="showErrorMessage = false"
      ></button>
    </span>
  </div>
</template>

<style>
@import url("../products.css");
</style>
