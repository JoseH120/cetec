<script setup>
import {ref, reactive, onMounted} from 'vue';
import { mostrarAlerta } from "@/funciones/funciones";
import { api } from "@/pluggins/axios";
import Swal from "sweetalert2";


    let Tema = ref("Mis tramites");
    const tipo = localStorage.getItem("tipo");
    let flag = ref(false);
    const idTutor = ref(0);

    const estado = reactive({
        solicitudes: {},
        cargando: false,
    }); 
    

    const getIdTutor = async () => {
        const id = localStorage.getItem("idusuario");
        const respuesta = api.get(`/tutores/getTutor/${Number(id)}`);
        const IdTutor = (await respuesta).data.idtutor;
        idTutor.value = IdTutor;
    }
    
    
    const getSolicitudes = async () => {
        getIdTutor();
        let url = "";
        if(tipo == "TUTOR"){
            url = "/solicitudes/"+idTutor.value;
        }
        else if(tipo == "ADMINISTRADOR"){
            url = "/solicitudes";
        }
        else{
            url = "/solicitudes";
        }
        try {
            const respuesta = api.get(url);
            estado.solicitudes = (await respuesta).data;
            estado.cargando = false;
        } catch (error) {
            estado.cargando = true;
            console.log(error);
            mostrarAlerta("There was an error", "error");
        }
    };

    const eliminar = (curso, id) => {
        Swal.fire({
        title: `¿Desea eliminar la solicitud de curso ${curso}?`,
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
            .delete(`/solicitudes/delete/${id}`)
            .then(() => {
                mostrarAlerta("Registro eliminado", "success");
                getSolicitudes();
            })
            .catch(() => {
                mostrarAlerta("Error al eliminar", "error");
            });
        } else if (result.isDismissed) {
            mostrarAlerta("Accion cancelada", "warning");
        }
    });
};

    onMounted(()=>{
        if(tipo == "ADMINISTRADOR"){
            flag.value = true;
        }
        else if(tipo == "TUTOR"){
            flag.value = false;
        }
        else{
            flag.value = false;
        }
    });

    getSolicitudes();

</script>
<template>
<h2>{{ Tema }}</h2>
<div class="container">
    <Router-link v-if="!flag"
    class="btn btn-success color-with m-1" to="/guardar_solicitud">
      <i class="fa-solid fa-plus"></i> Agregar
    </Router-link>

    <div class="row">
        <div class="table-responsive">
            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Curso</th>
                        <th>Comentario</th>
                        <th>Estado</th>
                        <th>Creado</th>
                        <th>Actualizado</th>
                        <th>Tutor</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider" id="contenido">
                    <tr v-if="estado.cargando">
                        <th colspan="8"><h3>Cargando . . .</h3></th>
                    </tr>
                    <tr v-else v-for="(soli, i) in estado.solicitudes" :key="soli.IdSolicitud">
                        <td v-text="soli.IdSolicitud"></td>
                        <td v-text="soli.NombreCurso"></td>
                        <td v-text="soli.Comentario"></td>
                        <td v-text="soli.Estado"></td>
                        <td v-text="soli.created_at"></td>
                        <td v-text="soli.updated_at"></td>
                        <td v-text="soli.IdTutor"></td>
                        <td>
                            <RouterLink
                            :to="{ path: '/guardar_solicitud/' + soli.IdSolicitud + '/1' }"
                            class="btn btn-info m-1"
                            >
                                <i class="fa-solid fa-eye"></i>
                            </RouterLink>

                            <RouterLink
                            :to="{ path: '/guardar_solicitud/' + soli.IdSolicitud + '/2' }"
                            class="btn btn-warning m-1"
                            v-if="flag"
                            >
                                <i class="fa-solid fa-edit"></i>
                            </RouterLink>

                            <button class="btn btn-danger m-1" v-on:click="eliminar(soli.NombreCurso, soli.IdSolicitud)">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                    
                        </td>
                        </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</template>
<style scoped>
</style>