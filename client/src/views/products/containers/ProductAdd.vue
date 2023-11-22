<script setup lang="ts">
import { useFetch } from "../../../utils/useFetch";
import { EHttpMethods } from "../../../utils/types";
import { APP_API_URL } from "../../../utils/constants";
import { ref } from "vue";

const ADD_PRODUCT_URL = `/product-add`;

const isAddProductLoading = ref<boolean>(false);
const handleSubmit = (event: any) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());
  try {
    isAddProductLoading.value = true;
    const response = useFetch<string>(`${APP_API_URL}${ADD_PRODUCT_URL}`, {
      method: EHttpMethods.POST,
      data,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  } finally {
    isAddProductLoading.value = false;
  }
};
</script>
<template>
  <div class="container-form">
    <h3 class="text-center">ADD PRODUCT</h3>
    <form
      class="p-3"
      method="post"
      :action="ADD_PRODUCT_URL"
      @submit="handleSubmit"
    >
      <div class="d-flex justify-content-center mb-3">
        <label class="d-none" for="product_name">Name</label>
        <input
          type="text"
          class="input-form-custom w-50"
          placeholder="Name..."
          name="product_name"
        />
      </div>
      <div class="d-flex justify-content-center mb-3">
        <label class="d-none" for="imgUrl"></label>
        <input
          type="text"
          class="input-form-custom w-50"
          placeholder="Image url..."
          step="any"
          name="imageUrl"
        />
      </div>
      <div class="d-flex justify-content-center mb-3">
        <label class="d-none" for="price"></label>
        <input
          type="text"
          class="input-form-custom w-50"
          placeholder="Price..."
          name="price"
        />
      </div>
      <div class="d-flex justify-content-center mb-3">
        <label class="d-none" for="description"></label>
        <input
          type="text"
          class="input-form-custom w-50"
          placeholder="Description..."
          name="description"
        />
      </div>
      <div class="d-flex justify-content-end mb-3">
        <button class="btn btn-dark px-3" type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>
<style>
.input-form-custom {
  border-radius: 0.25rem;
  padding: 0.375rem 0.75rem;
  box-shadow: 1px 2px 2px 0px rgba(0, 0, 0, 0.75);
  border: 1px solid #ced4da;
}

.container-form {
  width: 800px;
  margin: 10px auto;
  border-bottom: 2px solid #ced4da;
  border-top: 2px solid #ced4da;
  padding-top: 10px;
}
</style>
