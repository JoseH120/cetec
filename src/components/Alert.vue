<template>
  <div class="col-12">
    <div :class="'alert alert' + classAlert" role="alert" v-html="msg"></div>
  </div>
</template>

<script setup>
defineProps({
  classAlert: String,
  msg: String,
});
</script>
