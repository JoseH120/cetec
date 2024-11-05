<script setup>
import { api } from "@/pluggins/axios";
import { useRoute } from "vue-router";
import { reactive, ref } from "vue";
import { mostrarAlerta } from "@/funciones/funciones";
import router from "@/router";

const route = useRoute();
const idActividad = ref(parseInt(route.params.idActividad));
const idEstudiante = ref(parseInt(route.params.idEstudiante));
const detalleTarea = ref(null); 

const verTarea = async () =>{

    try{
        //enviar idActividad / idEstudiante 
        const respuesta = api.get(`/actividadesestudiantes/verTarea/${Number(idActividad.value)}/${Number(idEstudiante.value)}`);
        detalleTarea.value = (await respuesta).data;
        console.log((await respuesta).status);
    }
    catch(e){
        mostrarAlerta(e.response.data.messages.error, "error")
        router.go(-1);
    }
    
}

verTarea();

</script>

<template>
<div class="container">
    <div v-if="detalleTarea" v-for="(Tarea, i) in detalleTarea" 
    :key="Tarea.Idactividad_estudiante"
    class="item my-4 p-4">
        <h2 class="tittle">Actividad: {{ Tarea.Tema }}</h2>
        <p class="text-muted">{{ Tarea.Descripcion }}</p>
        <div>
            <a :href="Tarea.UrlRecurso" class="btn btn-primary" target="_blank">
                <i class="fa-solid fa-file"></i> Ver Archivo</a>
        </div>
        <hr>
        <div class="row my-2">
            <div class="col-2">
                <label>Estudiante: </label>
            </div>
            <div class="col-10">
                <p class="col-10 ml-2 text-muted" v-text="(Tarea.PrimerNombre +' '+ Tarea.PrimerApellido)">
                </p>
            </div>
        </div>
        
        <a :href="Tarea.UrlTarea" class="btn btn-light my-2" target="_blank">
                <i class="fa-solid fa-file"></i> Ver Tarea Enviada
        </a>

        <div class="row my-2">
            <div class="col-2">
                <label>Nota: </label>
            </div>
            <div class="col-10">
                <strong>
                    <p class="text-muted" v-text="('Calificación: '+ Tarea.Nota +'/10.00')"></p>
                </strong>
            </div>
        </div>
        
        
    </div>
</div>
</template>

<style scoped>

.item{
    border: 3px solid rgb(178, 192, 255, 0.2);
    border-radius: 25px;
}

hr{
    border: 4px solid rgb(178, 192, 255, 0.4);
}

.tittle{
    text-align: left; 
    font-family: Arial; 
    font-size: 30px; 
    COLOR: #1278BF; 
    text-shadow: 0px 0px 9px #508AD3;
}

.text-muted:hover{
    font-size: x-large;
}

.tittle:hover{
    font-size: 40px;
}

label, p{
    font-size: larger;
}

</style>