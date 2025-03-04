<script setup>
import { defineProps, defineEmits, reactive, ref } from "vue";
import { api } from "@/pluggins/axios";
const hasSeccion = ref(false);
const props = defineProps({
  IdLeccion: String,
  editable: Boolean,
});

const emit = defineEmits(["openModal"]);

const estado = reactive({
  secciones: [],
});

const seccionesByLeccion = async () => {
  try {
    const respuesta = api.get(
      `/secciones/seccionesByLeccion/${props.IdLeccion}`
    );
    console.log(respuesta);
    if ((await respuesta).data) {
      hasSeccion.value = true;
      estado.secciones = (await respuesta).data;
    } else {
      hasSeccion.value = false;
    }
  } catch (e) {
    console.log(e);
  }
};

const eliminarSeccion = (idSeccion) => {};

const selectedSeccion = (seccion) => {
  emit("openModal", seccion);
};

seccionesByLeccion();
</script>
<template v-if="hasSeccion" class="container">
  <section
    v-for="(seccion, i) in estado.secciones"
    class="row p-3 p rounded-pill"
  >
    <div class="col-md-10 col-sm-12 col-10">
      <p>
        {{ seccion.Contenido }}
        <button v-if="seccion.Url" @:click="seccion.Url" class="btn btn-link">
          Dar click!
        </button>
      </p>
    </div>
    <!-- <hr /> -->
    <div v-if="props.editable" class="col-2 col-md-2 col-sm-12">
      <button
        class="btn btn-info float-right"
        @click="selectedSeccion(seccion)"
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
</template>

<style scoped>
section {
  border: 3px solid rgb(178, 192, 255, 0.2);
  margin: 1px;
}
</style>
