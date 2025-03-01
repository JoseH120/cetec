<script setup>
import { reactive } from "vue";

let props = defineProps({
  idCurso: Number,
  lista: Object,
  Vista: String,
  nombreCurso: String,
});

const curso = reactive({
  NombreCurso: "",
});

const emit = defineEmits(["refreshSideBar"]);

const toggleSideBar = () => {
  const barraLateral = document.getElementById("barraLateral");
  const spans = document.querySelectorAll("span");

  barraLateral.classList.toggle("mini-barra-lateral");

  spans.forEach((span) => {
    span.classList.toggle("oculto");
  });
};
</script>

<template>
  <div class="barra-lateral bg-light" id="barraLateral">
    <div class="nombre-pagina">
      <i class="fa-solid fa-bars icon" @click="toggleSideBar"></i>
      <span class="span" id="span">{{ props.nombreCurso }}</span>
    </div>
    <nav class="navegacion">
      <ul v-if="Vista == 'ACTIVIDADES'">
        <li v-for="(element, i) in lista" :key="element.IdActividad">
          <a :href="'#' + element.IdActividad" class="bg-light">
            <i class="fa-solid fa-greater-than"></i
            ><span>{{ element.Tema }}</span>
          </a>
        </li>
      </ul>
      <ul v-else-if="Vista == 'LECCIONES'">
        <li v-for="(element, i) in lista" :key="element.IdLeccion">
          <a :href="'#' + element.IdLeccion" class="bg-light">
            <i class="fa-solid fa-greater-than"></i
            ><span>{{ element.Tema }}</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.barra-lateral {
  width: 250px;
  height: 100hw;
  overflow: hidden;
  padding: 20px 15px;
  background-color: rgb(255, 255, 255);
  transition: width 0.5s ease;
}

.mini-barra-lateral {
  width: 80px;
}

.barra-lateral span {
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 18px;
  text-align: left;
  opacity: 1;
  transition: opacity 0.5s ease, width 0.5s ease;
}

.barra-lateral span.oculto {
  opacity: 0;
}

.barra-lateral .nombre-pagina {
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  margin-bottom: 50px;
}

.barra-lateral .nombre-pagina .icon {
  min-width: 50px;
  font-size: 40px;
  cursor: pointer;
}

.barra-lateral .boton {
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 10px;
  background-color: rgb(0, 0, 0);
  color: rgb(255, 255, 255);
}

.barra-lateral .boton i {
  min-width: 50px;
  font-size: 25px;
}

.barra-lateral .nombre-pagina .span {
  font-size: 25px;
  margin-left: 5px;
  opacity: 1;
  transition: opacity 0.5s ease;
  font-size: xx-large;
  font-weight: 500;
}

.barra-lateral .nombre-pagina span.oculto {
  opacity: 0;
}

.barra-lateral .navegacion li {
  list-style: none;
  display: flex;
  margin-bottom: 5px;
}

.barra-lateral .navegacion a {
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  text-decoration: none;
  border-radius: 10px;
  color: rgb(134, 136, 144);
}

.barra-lateral .navegacion a:hover {
  color: rgb(0, 0, 0);
}

.barra-lateral .navegacion i {
  min-width: 50px;
  font-size: 20px;
}
</style>
