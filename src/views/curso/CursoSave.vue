<script setup>
import { api } from "@/pluggins/axios";
import { reactive, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { enviarSolicitud } from "@/funciones/funciones";
import TutoresModal from "@/views/components/TutoresModal.vue";

const route = useRoute();
const idCurso = route.params.id;
const opcion = route.params.case;
const mostrarModal = ref(false);
let activo = ref(null);

const form = reactive({
  IdCurso: 0,
  NombreCurso: "",
  Descripcion: "",
  Grupo: "",
  IdTutor: null,
});

onMounted(() => {
  switch (Number(opcion)) {
    case 0:
      //Insertar
      activo.value = false;
      break;
    case 1:
      //Ver
      getCurso(idCurso);
      activo.value = true;
      break;
    case 2:
      //editar
      activo.value = false;
      getCurso(idCurso);
      break;
    default:
      activo.value = false;
      break;
  }
});

const getCurso = async (id) => {
  const respuesta = api.get(`/cursos/edit/${Number(id)}`);
  const curso = (await respuesta).data;
  form.IdCurso = curso.IdCurso;
  form.NombreCurso = curso.NombreCurso;
  form.Descripcion = curso.Descripcion;
  form.Grupo = curso.Grupo;
  form.IdTutor = curso.IdTutor;
};

const guardarCurso = () => {
  if (opcion == 0) {
    enviarSolicitud(
      "POST",
      form,
      "/cursos/create",
      "Registro guardado exitosamente",
      "/listar_cursos"
    );
  } else if (opcion == 2) {
    enviarSolicitud(
      "PUT",
      form,
      "/cursos/update/" + idCurso,
      "Registro actualizado exitosamente",
      "/listar_cursos"
    );
  }
};

const limpiar = () => {
  form.IdCurso = null;
  form.NombreCurso = "";
  form.Descripcion = "";
  form.Grupo = "";
  form.IdTutor = null;
};

const toggleTutoresModal = () => {
  mostrarModal.value = !mostrarModal.value;
};

const establecerTutor = (tutor) => {
  form.IdTutor = tutor.IdTutor;
  form.Correo = tutor.email;
  mostrarModal.value = !mostrarModal.value;
};
</script>

<template>
  <div class="container">
    <!---->
    <Transition name="fade">
      <TutoresModal
        v-if="mostrarModal"
        @close="toggleTutoresModal()"
        @dblclickTutor="establecerTutor"
      />
    </Transition>
    <!---->

    <h2>Registrar curso</h2>
    <form action="" id="Formulario" @submit.prevent="guardarCurso()">
      <label for="txtIdCurso" id="lblIdCurso" hidden>Id Curso: </label>
      <input
        type="hidden"
        id="txtIdCurso"
        class="form-control"
        disabled
        v-model="form.IdCurso"
      />

      <label for="txtNombre" class="form-label">Nombre del curso: </label>
      <input
        type="text"
        id="txtNombre"
        autofocus
        placeholder="Escribir . . ."
        class="form-control"
        v-model="form.NombreCurso"
        :disabled="activo"
      />

      <br />
      <label for="taDescripcion" class="form-label"
        >Descripción del curso:
      </label>
      <textarea
        name=""
        id="taDescripcion"
        cols="12"
        rows="5"
        placeholder="Escribir . . ."
        class="form-control"
        v-model="form.Descripcion"
        :disabled="activo"
      ></textarea>

      <label for="txtGrupo" class="form-label">Grupo: </label>
      <input
        type="text"
        id="txtGrupo"
        placeholder="Escribir . . ."
        class="form-control"
        v-model="form.Grupo"
        :disabled="activo"
      />

      <label for="cbTutor" class="form-label">Tutor:</label>
      <input
        type="text"
        class="form-control txtIdTutor"
        id="txtIdTutor"
        readonly
        placeholder="--Seleccionar--"
        title="haz click"
        @click="toggleTutoresModal"
        v-model="form.IdTutor"
        :disabled="activo"
      />

      <br />
      <div class="d-grid gap-2 d-md-block">
        <button class="btn btn-primary" id="btnGuardar" :hidden="activo">
          <i class="fa-solid fa-floppy-disk"></i> Guardar
        </button>
        &nbsp;
        <button
          type="button"
          id="btnLimpiar"
          class="btn btn-light"
          @click="limpiar"
          :hidden="activo"
        >
          <i class="fa-solid fa-note-sticky"></i> Limpiar
        </button>
        &nbsp;
        <Router-link
          class="btn btn-warning"
          to="/listar_cursos"
          id="btnRegresar"
        >
          <i class="fa-solid fa-square-caret-left"></i> Regresar
        </Router-link>
      </div>
    </form>
  </div>
</template>

<style scoped>
textarea {
  resize: none;
}
</style>
