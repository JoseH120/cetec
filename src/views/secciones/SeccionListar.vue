<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import SeccionItem from "./SeccionItem.vue";
// import { api } from "@/pluggins/axios";
import SeccionSave from "./SeccionSave.vue";
const idLeccion = useRoute().params.idLeccion;
const temaLeccion = useRoute().params.temaLeccion;
const router = useRouter();
const Seccion = ref(null);
const Secciones = ref(null);

function openModal(item = null) {
  if (item) {
    Seccion = item;
  }
  const windowBackgroundSeccion = document.getElementById(
    "window-background-seccion"
  );
  windowBackgroundSeccion.style.display = "flex";
}
</script>

<template>
  <div class="Container">
    <SeccionSave
      :IdLeccion="idLeccion"
      :TemaLeccion="temaLeccion"
      :seccion="Seccion"
    ></SeccionSave>
    <div class="container contenido mt-3">
      <h2>{{ temaLeccion }}</h2>
      <button class="btn btn-success" @click="openModal()">
        <i class="fa-solid fa-plus"></i> Agregar
      </button>
      <button class="btn btn-link" @click="router.go(-1)">
        <i class="fa-solid fa-arrow-left"></i> Regresar
      </button>
      <SeccionItem
        :IdLeccion="idLeccion"
        :editable="true"
        @openModal="selectedSeccion"
      ></SeccionItem>
    </div>
  </div>
</template>
<style scoped>
.Container {
  display: flex;
  width: 100%;
}
.contenido {
  width: 100%;
  margin: 10px;
}
</style>
