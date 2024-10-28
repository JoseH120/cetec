<script setup>

import SideBar from '../components/SideBar.vue';
import ActividadSave from '../actividades/ActividadSave.vue';
import { useRoute } from "vue-router";
import { api } from '@/pluggins/axios';
import {  reactive, ref } from 'vue';
import Swal from "sweetalert2";
import { mostrarAlerta } from "@/funciones/funciones";

const route = useRoute();
const idCurso = ref(parseInt(route.params.idCurso));
const Actividades = ref(null);
const TipoUsuario = localStorage.getItem('tipo');
const activo = ref(true);

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
    const  respuesta = api.get(`/actividades/actividadesByCurso/${idCurso.value}`)

    Actividades.value = (await respuesta).data;
}

const openModal = ()=>{
    const windowBackground = document.getElementById('window-background');
    windowBackground.style.display='flex'
}

const eliminarActividad = (actividad, id)=>{
    Swal.fire({
    title: `Desea eliminar la actividad ${actividad}`,
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
      api
        .delete(`/actividades/delete/${id}`)
        .then(() => {
          mostrarAlerta("Registro eliminado", "success");
          getActividades();
        })
        .catch(() => {
          mostrarAlerta("Error al elimar", "error");
        });
    } else if (result.isDismissed) {
      //   Swal.fire("Dissmissed action of deliting");
      mostrarAlerta("Accion cancelada", "warning");
    }
  });
}

const refresh = ()=>{
    getActividades();
    getCurso(idCurso.value);
}

getCurso(idCurso.value);
getActividades();


</script>

<template>
    <div class="Container">
        <SideBar class="box" :actividades="Actividades" :idCurso="idCurso"/>
        
        <ActividadSave  :idCurso=idCurso @refresh="refresh"/>
        <div class="contenido">
            <h2>Curso de {{ curso.NombreCurso }}</h2>
            <div>
                <button class="open-button mb-2" id="open-button" @click="openModal">
                    <i class="fa fa-plus" aria-hidden="true"></i> Actividad
                </button>
            </div>
            
            <section v-for="(act, i) in Actividades" :key="act.IdActividad" :id="(act.IdActividad)" >
                <h3 v-text="(act.Tema)"></h3>
                <p v-text="(act.Descripcion)"></p>
                <a :href="(act.UrlRecurso)" target="_blank" >Archivo</a>
                <div class="acciones">
                    <button class="btn btn-danger" @click="eliminarActividad(act.Tema, act.IdActividad)"><i class="fa fa-trash"></i></button>
                    <RouterLink :to="{ path: '/' }" class="btn btn-info">
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                    </RouterLink>
                </div>
                
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

.acciones{
    display: flex;
    flex-direction: row-reverse;
    margin-right: 10px;
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

.open-button{
    padding: 0.5rem 1rem;
    border-radius: 4px;
    background-color:#28a745;
    color: #f7f9ff;
    border: none;
    transition: transfom .3 cubic-bezier(.36, .37, .76, .75);
    cursor: pointer;
}
.open-button:active{
    transform: scale(.95);
}

</style>