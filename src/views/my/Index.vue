<style scoped></style>

<template>
  &nbsp;
  <div class="container">
    <div class="row">
      <div
        v-if="cards"
        v-for="(card, i) in cards"
        :key="card.IdCurso"
        class="card mx-2"
        style="width: 18rem"
      >
        <div class="card-body">
          <h5 class="card-title" v-text="card.NombreCurso"></h5>
          <h6 class="card-subtitle mb-2 text-muted" v-text="card.Nombre"></h6>
          <p class="card-text" v-text="card.Descripcion"></p>
        </div>
        <div class="footer mb-2">
          <Router-link class="card-link" to="/">Ver curso</Router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const idEstudiante = ref(1);
const cards = ref(null);

const getMyCursos = () => {
  axios
    .get(
      "http://localhost/sistema/api/estudiantescursos/getCursosByEstudiante/" +
        idEstudiante.value
    )
    .then(async (res) => {
      cards.value = await res.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

getMyCursos();
</script>
