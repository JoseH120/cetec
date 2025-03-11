<script setup>
import { useRoute, useRouter } from "vue-router";
import { api } from "@/pluggins/axios";
import { ref } from "vue";
import SeccionSave from "./SeccionSave.vue";
import Swal from "sweetalert2";
import { mostrarAlerta } from "@/funciones/funciones"
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
  Swal.fire({
    title: "¿Desea eliminar este registro?",
    icon: "question",
    showCancelButton: true,
    customClass: {
      confirmButton: "btn btn-success me-3",
      cancelButton: "btn btn-danger",
    },
    confirmButtonText: '<i class="fa-solid fa-square-check"></i>Si, eliminar',
    cancelButtonText: '<i class="fa-solid fa-circle-xmark"></i>Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      api.delete(`/secciones/delete/${IdSeccion}`).then(() => {
        getSeccionesByLeccion();
        mostrarAlerta("Registro eliminado", "success");
      }).catch(() => {
        mostrarAlerta("Error al eliminar", "error")
      });
    } else if (result.isDismissed) {
      mostrarAlerta("Accion cancelada", "error");
    }
  });
};

const refresh = () => {
  getSeccionesByLeccion();
};
getSeccionesByLeccion();
refresh();
</script>

<template>
  <div class="Container">
    <SeccionSave :IdLeccion="IdLeccion" :TemaLeccion="temaLeccion" :seccion="Seccion" @refresh="refresh"></SeccionSave>
    <div class="container mt-3">
      <h2>{{ temaLeccion }}</h2>
      <button class="btn btn-success" @click="openModal()">
        <i class="fa-solid fa-plus"></i> Agregar
      </button>
      <button class="btn btn-link" @click="router.go(-1)">
        <i class="fa-solid fa-arrow-left"></i> Regresar
      </button>

      <section v-for="(seccion, i) in Secciones" class="row p-3 rounded-pill">
        <div class="col-md-10 col-sm-12 col-10">
          <p>
            {{ seccion.Contenido }}
          </p>
          <a v-if="seccion.Url" :href="seccion.Url" target="_blank" class="btn btn-link">
            recurso
          </a>
        </div>
        <div class="col-2 col-md-2 col-sm-12 float-right">
          <button class="btn btn-info" @click="openModal(seccion)">
            <i class="fa fa-pencil"></i>
          </button>
          <button class="btn btn-danger" @click="eliminarSeccion(seccion.IdSeccion)">
            <i class="fa fa-trash"></i>
          </button>
        </div>
      </section>

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

.acciones {
  display: flex;
  flex-direction: row-reverse;
  margin-right: 10px;
}

section {
  border: 3px solid rgb(178, 192, 255, 0.2);
  margin: 1px;
}
</style>
