<script setup>
import { defineProps, reactive, ref } from "vue";
import { api } from "@/pluggins/axios";
const hasSeccion = ref(false);
const props = defineProps({
  IdLeccion: String,
});

const estado = reactive({
  secciones: [],
});

const seccionesByLeccion = async () => {
  try {
    api.get(`/secciones/seccionesByLeccion/${props.IdLeccion}`).then((resp) => {
      if (resp.data) {
        hasSeccion.value = true;
        estado.secciones = resp.data;
      } else {
        hasSeccion.value = false;
      }
    });
  } catch (e) {
    console.log(e);
  }
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
  </section>
</template>

<style scoped>
section {
  border: 3px solid rgb(178, 192, 255, 0.2);
  margin: 1px;
}
</style>
