<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import SeccionSave from "./SeccionSave.vue";
import { api } from "@/pluggins/axios";
import { enviarSolicitud } from "@/funciones/funciones";
const IdLeccion = useRoute().params.idLeccion;
const temaLeccion = useRoute().params.temaLeccion;
const router = useRouter();
const Seccion = ref(null);
const Secciones = ref(null);

function openModal(item = null) {
  if (item) {
    Seccion.value = item;
  }
  const windowBackgroundSeccion = document.getElementById(
    "window-background-seccion"
  );
  windowBackgroundSeccion.style.display = "flex";
}

const getSeccionesByLeccion = async () => {
  try {
    api
      .get(`/secciones/seccionesByLeccion/${Number(IdLeccion)}`)
      .then((res) => {
        if (res.data) {
          Secciones.value = res.data;
        }
      });
  } catch (e) {
    console.log(e);
  }
};

const eliminarSeccion = (IdSeccion) => {
  enviarSolicitud(
    "DELETE",
    {},
    `/secciones/delete/${IdSeccion}`,
    `¿Desea eliminar esta seccion?`
  );
};

const refresh = () => {
  getSeccionesByLeccion();
};
getSeccionesByLeccion();
refresh();
</script>

<template>
  <div class="Container">
    <SeccionSave
      :IdLeccion="IdLeccion"
      :TemaLeccion="temaLeccion"
      :seccion="Seccion"
      @refresh="refresh"
    ></SeccionSave>
    <div class="container contenido mt-3">
      <h2>{{ temaLeccion }}</h2>
      <button class="btn btn-success" @click="openModal()">
        <i class="fa-solid fa-plus"></i> Agregar
      </button>
      <button class="btn btn-link" @click="router.go(-1)">
        <i class="fa-solid fa-arrow-left"></i> Regresar
      </button>
      <div class="container">
        <section
          v-for="(seccion, i) in Secciones"
          class="row p-3 p rounded-pill"
        >
          <div class="col-md-10 col-sm-12 col-10">
            <p>
              {{ seccion.Contenido }}
              <button
                v-if="seccion.Url"
                @:click="seccion.Url"
                class="btn btn-link"
              >
                Dar click!
              </button>
            </p>
          </div>
          <div class="col-2 col-md-2 col-sm-12">
            <button
              class="btn btn-info float-right"
              @click="openModal(seccion)"
            >
              <i class="fa fa-pencil"></i>
            </button>
            <button
              class="btn btn-danger"
              @click="eliminarSeccion(seccion.IdSeccion)"
            >
              <i class="fa fa-trash"></i>
            </button>
          </div>
        </section>
        <!-- <SeccionCard :IdLeccion="IdLeccion"></SeccionCard> -->
      </div>
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
