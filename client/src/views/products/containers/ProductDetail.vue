<script setup lang="ts">
import { useFetch } from "../../../utils/useFetch";
import { EHttpMethods } from "../../../utils/types";
import { APP_API_URL } from "../../../utils/constants";
import { ref, onMounted } from "vue";
import type { IProduct } from "./../products.types";
import { RouterLink, useRouter } from "vue-router";
const props = defineProps({
  productId: {
    type: String,
    required: true,
  },
});

const router = useRouter();
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

const deleteProduct = async (productId: number) => {
  try {
    const response = await useFetch<{ message: string }>(
      `${APP_API_URL}/product/${productId}`,
      {
        method: EHttpMethods.DELETE,
      }
    );
    if (response.error) {
      console.log(response.error);
    } else if (response.data) {
      router.push("/product/list");
    }
  } catch (error) {
    console.log(error);
  }
};
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
              <div class="d-flex justify-content-center gap-2">
                <RouterLink to="/product/list" class="card__btn"
                  >Go back to list <span>&rarr;</span></RouterLink
                >
                <button
                  class="card__btn"
                  @click="deleteProduct(specificProduct.id)"
                >
                  Delete product
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                      />
                      <path
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                      />
                    </svg>
                  </span>
                </button>
              </div>
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
