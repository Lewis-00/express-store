<script setup lang="ts">
import ProductList from "./containers/ProductList.vue";
import { ref } from "vue";
import {
  useRoute,
  type RouteLocationNormalizedLoaded,
  type RouteParams,
} from "vue-router";

const route: RouteLocationNormalizedLoaded = useRoute();
const params: RouteParams = route.params;

const idParams = ref(params.id);
</script>

<template>
  <ProductList />
</template>
