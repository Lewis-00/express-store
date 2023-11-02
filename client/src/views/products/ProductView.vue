<script setup lang="ts">
import ProductList from "./containers/ProductList.vue";
import ProductDetail from "./containers/ProductDetail.vue";
import { ref, watch } from "vue";
import { useRoute, type RouteLocationNormalizedLoaded } from "vue-router";

const route: RouteLocationNormalizedLoaded = useRoute();
const idParams = ref(route.params.id);

watch(
  () => route.params.id as string,
  (id: string) => {
    idParams.value = id;
  }
);
</script>

<template>
  <div v-if="idParams === 'list'">
    <ProductList />
  </div>
  <div v-else>
    <ProductDetail :productId="(idParams as string)" />
  </div>
</template>
