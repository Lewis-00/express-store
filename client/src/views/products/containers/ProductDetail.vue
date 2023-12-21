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
const showErrorMessage = ref<boolean>(false);
const requestError = ref<string | null>(null);

onMounted(async () => {
  isProductLoading.value = true;
  try {
    const response = await useFetch<{ product: IProduct }>(
      `${APP_API_URL}/product/${props.productId}`,
      {
        method: EHttpMethods.GET,
      }
    );
    if (response.error) {
      requestError.value = response.error;
      showErrorMessage.value = true;
    } else if (response.data?.product) {
      specificProduct.value = response.data.product;
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
  <div v-else-if="requestError">
    <div class="d-flex flex-column align-items-center">
      <p class="fs-3">
        <span class="text-danger">Ops!</span> Something went wrong.
      </p>
      <div class="d-flex gap-3">
        <RouterLink to="/" class="btn btn-dark">Go back to Home</RouterLink>
        <RouterLink to="/product/list" class="btn btn-dark"
          >Go back to List</RouterLink
        >
      </div>
    </div>
  </div>
  <div v-else-if="specificProduct">
    <div class="container d-flex justify-content-center">
      <div class="text-center" style="width: 30rem">
        <div class="grid__item">
          <div class="">
            <img
              class="card__img"
              :src="specificProduct.imageUrl"
              :alt="specificProduct.product_name"
            />
            <div class="card__content">
              <h1 class="card__header">{{ specificProduct.product_name }}</h1>
              <p class="card__text">
                {{ specificProduct.description }}
              </p>
              <p class="card__text">{{ specificProduct.price }}$</p>
              <RouterLink to="/product/list" class="card__btn"
                >Go back to list <span>&rarr;</span></RouterLink
              >
            </div>
          </div>
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
