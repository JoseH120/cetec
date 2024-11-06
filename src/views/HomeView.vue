<template>
  <div
    class="bg-image"
    style="
      background-image: url('http://localhost/sistema/uploads/fondo/cetec_home.jpg');
      height: 100vh;
    "
  ></div>
</template>
<style scoped>
.bg-image {
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

@media (max-width: 768px) {
  .bg-image {
    min-height: 30vh;
  }
}
</style>
