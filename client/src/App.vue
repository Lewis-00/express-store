<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import NavbarComponent from "./components/common/NavbarComponent.vue";
</script>

<template>
  <header>
    <NavbarComponent />
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
