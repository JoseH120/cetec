<script setup>
import { defineProps, reactive } from "vue";
import { api } from "@/pluggins/axios";
let hasSeccion = false;
const props = defineProps({ IdLeccion: String });

const estado = reactive({
  secciones: [],
});

const seccionesByLeccion = async () => {
  try {
    const respuesta = api.get(
      `/secciones/seccionesByLeccion/${props.IdLeccion}`
    );
    // console.log(respuesta);
    if ((await respuesta).data) {
      estado.secciones = (await respuesta).data;
      hasSeccion = true;
    } else {
      hasSeccion = false;
    }
  } catch (e) {
    console.log(e);
  }
};

seccionesByLeccion();
</script>
<template v-if="hasSeccion">
  <div v-for="(seccion, i) in estado.secciones">
    <p>{{ seccion.IdSeccion }}</p>
    <p>{{ seccion.Contenido }}</p>
    <p>{{ seccion.Url }}</p>
    <hr />
  </div>
</template>

<style scoped>
p {
  margin: 0px;
}
hr {
  margin: 0px;
}
</style>
