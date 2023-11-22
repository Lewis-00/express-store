<script setup lang="ts">
import { useFetch } from "../../../utils/useFetch";
import { EHttpMethods } from "../../../utils/types";
import type { IProduct } from "./../products.types";
import { ref, onMounted } from "vue";
import { APP_API_URL } from "../../../utils/constants";
import { useRouter } from "vue-router";
import { RouterLink } from "vue-router";

const router = useRouter();
const products = ref<IProduct[]>([]);

onMounted(async () => {
  const response = await useFetch<IProduct[]>(`${APP_API_URL}/products`, {
    method: EHttpMethods.GET,
  });
  if (response) {
    products.value = response;
  }
});

const redirectToDetail = (productId: number) => {
  router.push(`/product/${productId}`);
};
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
  <div class="container">
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
</template>

<style>
@import url("../products.css");
</style>
