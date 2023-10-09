<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="d-flex align-items-center justify-content-center">
    <div class="text-center">
      <h1 class="display-1 fw-bold">404</h1>
      <p class="fs-3"><span class="text-danger">Ops!</span> Page not found.</p>
      <p class="lead">The page you're looking for doesn't exist.</p>
      <RouterLink to="/" class="btn btn-dark">Go Home</RouterLink>
    </div>
  </div>
</template>

<style>
h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.5rem;
}
</style>
