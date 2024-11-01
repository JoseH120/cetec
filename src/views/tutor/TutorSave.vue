<script setup>
import { api } from "@/pluggins/axios";
import { reactive, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { enviarSolicitud } from "@/funciones/funciones";
import UsuariosModal from "@/views/components/UsuariosModal.vue";

const route = useRoute();
const idTutor = route.params.id;
const opcion = route.params.case;
const mostrarModal = ref(false);
let activo = ref(null);

const form = reactive({
  IdTutor: 0,
  Nombre: "",
  Apellido: "",
  Correo: "",
  Contacto: "",
  IdUsuario: null,
});

onMounted(() => {
  switch (Number(opcion)) {
    case 0:
      //Insertar
      activo.value = false;
      break;
    case 1:
      //Ver
      activo.value = true;
      getTutor(idTutor);
      break;
    case 2:
      //editar
      activo.value = false;
      getTutor(idTutor);
      break;
    default:
      activo.value = false;
      break;
  }
});

const getTutor = async (id) => {
  const respuesta = api.get(`/tutores/edit/${Number(id)}`);

  const tutor = (await respuesta).data;
  form.Idtutor = tutor.IdTutor;
  form.Nombre = tutor.Nombre;
  form.Apellido = tutor.Apellido;
  form.Correo = tutor.Correo;
  form.Contacto = tutor.Contacto;
  form.IdUsuario = tutor.IdUsuario;
};

const guardarTutor = () => {
  if (opcion == 0) {
    enviarSolicitud(
      "POST",
      form,
      "/tutores/create",
      "Registro guardado exitosamente",
      "/listar_tutores"
    );
  } else if (opcion == 2) {
    enviarSolicitud(
      "PUT",
      form,
      "/tutores/update/" + idTutor,
      "Registro actualizado exitosamente",
      "/listar_tutores"
    );
  }
};

const limpiar = () => {
  form.Idtutor = 0;
  form.Nombre = "";
  form.Apellido = "";
  form.Correo = "";
  form.Contacto = "";
  form.IdUsuario = "";
};

const toggleUsuariosModal = () => {
  mostrarModal.value = !mostrarModal.value;
};

const establecerUsuario = (uss) => {
  form.IdUsuario = uss.IdUsuario;
  form.Correo = uss.email;
  mostrarModal.value = !mostrarModal.value;
};
</script>
<template>
  <div class="container">
    <!-- <Transition name="fade"> -->
    <UsuariosModal
      TipoUsuarios="TUTOR"
      v-if="mostrarModal"
      @close="toggleUsuariosModal()"
      @dblclickUsuario="establecerUsuario"
    />
    <!-- </Transition> -->

    <h2>Guardar Tutor</h2>
    <br />
    <fieldset>
      <form class="row g-3" id="Formulario" @submit.prevent="guardarTutor()">
        <div class="col-md-12">
          <label for="txtIdTutor" class="form-label" id="lblIdTutor" hidden
            >Id Tutor:
          </label>
          <input
            type="hidden"
            id="txtIdTutor"
            class="form-control"
            v-model="form.IdTutor"
          />
        </div>
        <div class="col-md-6">
          <label for="txtNombre" class="form-label">Nombres: </label>
          <input
            type="text"
            class="form-control"
            id="txtNombre"
            v-model="form.Nombre"
            :disabled="activo"
            placeholder="Escribir . . ."
            autofocus
          />
        </div>
        <div class="col-md-6">
          <label for="txtApellido" class="form-label">Apellidos: </label>
          <input
            type="text"
            class="form-control"
            id="txtApellido"
            v-model="form.Apellido"
            :disabled="activo"
            placeholder="Escribir . . ."
          />
        </div>
        <div class="col-md-6">
          <label for="txtEmail" class="form-label">Correo: </label>
          <input
            type="email"
            class="form-control"
            id="txtEmail"
            v-model="form.Correo"
            :disabled="activo"
            placeholder="Ejemplo@correo.com"
          />
        </div>
        <div class="col-md-6">
          <label for="txtContacto" class="form-label">Telefono celular: </label>
          <input
            type="number"
            class="form-control"
            id="txtContacto"
            v-model="form.Contacto"
            :disabled="activo"
            placeholder="xxxxxxxx"
          />
        </div>
        <div class="col-md-3">
          <label for="txtIdUsuario" class="form-label">Usuario:</label>
          <input
            type="text"
            id="txtIdUsuario"
            class="form-control"
            placeholder="--Seleccionar--"
            v-model="form.IdUsuario"
            :disabled="activo"
            @click="toggleUsuariosModal()"
            title="Haz click"
            readonly
          />
        </div>
        <div class="col-12">
          <button class="btn btn-primary" id="btnGuardar" :hidden="activo">
            <i class="fa-solid fa-floppy-disk"></i> Guardar
          </button>
          &nbsp;
          <button
            type="button"
            id="btnLimpiar"
            class="btn btn-light boton"
            :hidden="activo"
            @click="limpiar()"
          >
            <i class="fa-solid fa-note-sticky"></i> Limpiar
          </button>
          &nbsp;
          <Router-link
            class="btn btn-warning"
            to="/listar_tutores"
            id="btnRegresar"
          >
            <i class="fa-solid fa-square-caret-left"></i> Regresar
          </Router-link>
        </div>
      </form>
    </fieldset>
  </div>
</template>
<style scoped></style>
