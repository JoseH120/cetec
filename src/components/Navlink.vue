<template>
  <!-- <RouterLink
    :class="[isActiveLink(path) ? 'bg-primary' : 'bg-dark', 'nav-item']"
    :to="path"
    tag="li"
  > -->
  <RouterLink class="nav-item" :to="path" tag="li">
    <a class="nav-link">{{ text }}</a>
  </RouterLink>
</template>
<script setup>
import { RouterLink, useRoute } from "vue-router";
defineProps({
  text: String,
  path: String,
});
// const isActiveLink = (path) => {
//   const route = useRoute();
//   return route.path === path;
// };
</script>
