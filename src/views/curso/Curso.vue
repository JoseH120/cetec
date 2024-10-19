<script setup>

import SideBar from '../components/SideBar.vue';
import { useRoute } from "vue-router";
import { api } from '@/pluggins/axios';
import { reactive, ref } from 'vue';

const route = useRoute();
const idCurso = parseInt(route.params.idCurso);
const Actividades = ref(null);

const curso = reactive({
    IdCurso: 0,
    NombreCurso: '',
    Grupo: '',
    IdTutor:0
});

const getCurso = async (id)=>{
  const respuesta = api.get(`/cursos/edit/${Number(id)}`);

  const Curso = (await respuesta).data;

  curso.IdCurso = Curso.IdCurso;
  curso.NombreCurso = Curso.NombreCurso;
  curso.Grupo = Curso.Grupo;
  curso.IdTutor = Curso.IdTutor;
};

const getActividades = async () =>{
    const  respuesta = api.get(`/actividades/actividadesByCurso/${idCurso}`)

    Actividades.value = (await respuesta).data;
}

getCurso(idCurso);
getActividades();


</script>

<template>
    <div class="Container">
        <SideBar class="box" :idCurso=idCurso />
        <div class="contenido">
            <h2>Curso de {{ curso.NombreCurso }}</h2>
            <section v-for="(act, i) in Actividades" :key="act.IdActividad" id=i >
                <h3 v-text="(act.Tema)"></h3>
                <p v-text="(act.Descripcion)"></p>
                <p>{{ i }}</p>
            </section>
        </div>
    </div>

</template>

<style scoped>
.Container{
    display: flex;
    width: 100%;
}

.box{
    text-align: center;
}

.contenido{
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 10px;
}

h2, section{
    padding-left: 5%;
    padding-top: 10px;
    padding-bottom: 10px;
}

section{
    border: 3px solid rgb(178, 192, 255, 0.2);
    border-radius: 30px;
    margin: 1px;
}
</style>