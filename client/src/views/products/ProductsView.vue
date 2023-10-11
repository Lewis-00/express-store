<script setup lang="ts">
import { useFetch } from "../../utils/useFetch";
import { EHttpMethods } from "../../utils/types";
import type { IProduct } from "./products.types";
import { ref, onMounted } from "vue";
import { APP_API_URL } from "@/utils/constants";

const products = ref<IProduct[]>([]);

onMounted(async () => {
  const response = await useFetch<IProduct[]>(`${APP_API_URL}/products`, {
    method: EHttpMethods.GET,
  });
  if (response) {
    products.value = response;
  }
});
</script>

<template>
  <div class="container mx-auto mt-4">
    <div class="row">
      <div
        v-for="product in products"
        :key="product.productId"
        class="col-md-4"
      >
        <div v-if="product.title" class="card" style="width: 18rem">
          <img
            :src="product.imageUrl"
            class="card-img-top"
            :alt="product.title"
          />
          <div class="card-body">
            <p class="card-text">{{ product.title }} - {{ product.price }}$</p>
            <button class="btn btn-primary">Detail</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
