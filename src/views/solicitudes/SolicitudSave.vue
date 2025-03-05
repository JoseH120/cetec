<script setup>
import { api } from "@/pluggins/axios";
import { reactive, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { enviarSolicitud } from "@/funciones/funciones";

    const route = useRoute();
    const idSolicitud = route.params.id;
    const opcion = route.params.case;
    let activo = ref(null);
    let fl = ref(null);

    const form = reactive({
        IdSolicitud: 0,
        NombreCurso: "",
        Comentario: "",
        Estado: "",
        IdTutor: 0,
    });

    onMounted(() => {
        const tipo = localStorage.getItem("tipo");
        switch (Number(opcion)) {
            case 0:
                //Insertar
                activo.value = false;
                fl = true;
                form.Estado = "SOLICITADO";
            break;
            case 1:
                //Ver
                getSolicitud(idSolicitud);
                activo.value = true;
            break;
            case 2:
                //editar
                
                getSolicitud(idSolicitud);
                if(tipo == "TUTOR"){
                    activo.value = false;
                    fl = true;
                }
                else if(tipo == "ADMINISTRADOR"){
                    fl = false;
                }
                else{
                    activo.value = false;
                    fl = true;
                }
            break;
            default:
                activo.value = false;
            break;
        }
    });

    const getSolicitud = async (id) => {
        const respuesta = api.get(`/solicitudes/edit/${Number(id)}`);
        const solicitud = (await respuesta).data;
        form.IdSolicitud = solicitud.IdSolicitud;
        form.NombreCurso = solicitud.NombreCurso;
        form.Comentario = solicitud.Comentario;
        form.Estado = solicitud.Estado;
        form.IdTutor = solicitud.IdTutor;
    };

    const guardarSolicitud = () => {
        if (opcion == 0) {
            enviarSolicitud(
            "POST",
            form,
            "/solicitudes/create",
            "Registro guardado exitosamente",
            "/listar_solicitudes");
        } else if (opcion == 2) {
            enviarSolicitud(
            "PUT",
            form,
            "/solicitudes/update/" + idSolicitud,
            "Registro actualizado exitosamente",
            "/listar_solicitudes");
        }
    };

    const limpiar = () => {
        form.IdSolicitud = null;
        form.NombreCurso = "";
        form.Comentario = "";
        form.Estado = "";
        form.IdTutor = null;
    };

    const getIdTutor = async () => {
        const id = localStorage.getItem("idusuario");
        const respuesta = api.get(`/tutores/getTutor/${Number(id)}`);
        const IdTutor = (await respuesta).data.idtutor;
        form.IdTutor = IdTutor;
    }
    getIdTutor();
</script>
<template>
<h2>Guardar solicitud</h2>
<div class="container">
    <form action="" id="Formulario" @submit.prevent="guardarSolicitud()">
        <label for="txtIdSolicitud" id="lblIdSolicitud" hidden>Id solicitud: </label>
        <input
            type="hidden"
            id="txtIdSolicitud"
            class="form-control"
            disabled
            v-model="form.IdSolicitud"
        />

        <label for="txtNombre" class="form-label">Nombre del curso: </label>
        <input
            type="text"
            id="txtNombre"
            autofocus
            placeholder="Escribir . . ."
            class="form-control"
            v-model="form.NombreCurso"
            :disabled="activo || !fl"
            required
        />

        <label for="taComentario" class="form-label"> Comentario:
        </label>
      <textarea
        name=""
        id="taComentario"
        cols="12"
        rows="5"
        placeholder="Escribir . . ."
        class="form-control"
        v-model="form.Comentario"
        :disabled="activo || !fl"
      ></textarea>

      <label for="txtEstado" class="form-label">Estado: </label>
      <select name="" id="txtEstado" class="form-control" v-model="form.Estado" :disabled="(activo || fl)">
        <option value="SOLICITADO" selected>SOLICITADO</option>
        <option value="APROBADO">APROBADO</option>
        <option value="PROCESO">PROCESO</option>
        <option value="DENEGADO">DENEGADO</option>
        <option value="ANULADO">ANULADO</option>
      </select>

      <button class="btn btn-primary my-2" id="btnGuardar" :hidden="activo">
          <i class="fa-solid fa-floppy-disk"></i> Guardar
        </button>
    </form>
</div>
    
</template>
<style scoped>
</style>