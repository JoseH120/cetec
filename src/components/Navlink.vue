<template>
  <li class="nav-item">
    <RouterLink class="nav-link" :to="path" tag="a">{{ text }}</RouterLink>
  </li>
</template>
<script setup>
import { RouterLink } from "vue-router";
defineProps({
  text: String,
  path: String,
});
</script>
