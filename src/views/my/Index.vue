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
          <p class="card-subtitle mb-2 text-muted" v-text="'Grupo: '+card.Grupo"></p>
        </div>
        <div class="footer mb-2">
          <Router-link class="btn btn-primary m-1" :to="('/curso/'+card.IdCurso)">Ver curso</Router-link>
          <Router-link class="card-link" :to="('/matricula/'+card.IdCurso)">Matricula</Router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const Tipo = 'TUTOR';
const id = ref(90);
const cards = ref(null);

const getMyCursos = () => {
  switch (Tipo) {
    case 'TUTOR':
      {
        axios.get(
          "http://localhost/sistema/api/cursos/CursosByTutor/" +
          id.value
        )
        .then(async (res) => {
          cards.value = await res.data;
        })
        .catch((error) => {
          console.log(error);
        });
      }
      break;
    case 'ESTUDIANTE':
      {
        axios.get(
          "http://localhost/sistema/api/estudiantescursos/getCursosByEstudiante/" +
          id.value
        )
        .then(async (res) => {
          cards.value = await res.data;
        })
        .catch((error) => {
          console.log(error);
        });
      }   
      break;
    default:
      break;
  }
};

getMyCursos();
</script>
