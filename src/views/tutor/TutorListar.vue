<script setup>

import { mostrarAlerta } from "@/funciones/funciones";
import { api } from "@/pluggins/axios";
import Swal from "sweetalert2";
import { reactive, ref } from "vue";

let tutores = reactive({});
let cargando = ref(false);

const getTutores = async () => {
    cargando.value = true; 
    try {
        const response = api.get("/tutores");
        tutores = (await response).data;
        cargando.value = false;
    } catch (error) {}
};


const eliminar = (id, tutor) =>{
    Swal.fire({
    title: `¿Desea eliminar el tutor ${tutor}?`,
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
        .delete(`/tutores/delete/${id}`)
        .then(() => {
          mostrarAlerta("Registro eliminado", "success");
          getTutores();
        })
        .catch((error) => {
          mostrarAlerta("Error al eliminar", "error");
        });
    } else if (result.isDismissed) {
      //   Swal.fire("Dissmissed action of deliting");
      mostrarAlerta("Accion cancelada", "warning");
    }
  });
}

getTutores();
</script>
<template>
<div class = "container">
    <h2>Lista de tutores</h2>
        <Router-link class="btn btn-success color-with" to="/guardar_tutor">
            <i class="fa-solid fa-plus"></i> Agregar
        </Router-link>
        <div class="row">
            <div class="col-lg-8 offset-lg-2">
                <div class="table-responsive">
                    <table class="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Correo</th>
                                <th>Contacto</th>
                                <th>Id Usuario</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody class="table-group-divider" id="contenido">
                            <tr v-if="cargando.value">
                                <th colspan="7"><h3>Cargando . . . </h3></th>
                            </tr>
                            <tr v-else v-for="tutor, i in tutores" :key="tutor.Idtutor">
                                <td v-text="(tutor.IdTutor)"></td>
                                <td v-text="(tutor.Nombre)"></td>
                                <td v-text="(tutor.Apellido)"></td>
                                <td v-text="(tutor.Correo)"></td>
                                <td v-text="(tutor.Contacto)"></td>
                                <td v-text="(tutor.IdUsuario)"></td>
                                <td>
                                    <RouterLink :to="{path:'guardar_tutor/'+ tutor.IdTutor+'/1'}"  class="btn btn-info m-1">
                                        <i class="fa-solid fa-eye"></i>
                                    </RouterLink>
                                    <RouterLink :to="{path:'guardar_tutor/'+tutor.IdTutor+'/2'}"  class="btn btn-warning m-1">
                                        <i class="fa-solid fa-edit"></i>
                                    </RouterLink>
                                    <button class="btn btn-danger m-1" @click="eliminar(tutor.IdTutor, tutor.Nombre+' '+tutor.Apellido)">
                                        <i class="fa-solid fa-trash-can"></i> 
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        
    </div>
</template>
<style scoped>

</style>