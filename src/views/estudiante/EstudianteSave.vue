<script setup>
import { api } from "@/pluggins/axios";
import { reactive, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { enviarSolicitud } from "@/funciones/funciones";
import UsuariosModal from "@/views/components/UsuariosModal.vue";

const route = useRoute();
const idEstudiante = route.params.id;
const opcion = route.params.case;
const mostrarModal = ref(false);
let activo = ref(null);

const form = reactive({
  IdEstudiante: 0,
  PrimerNombre: "",
  SegundoNombre: "",
  PrimerApellido: "",
  SegundoApellido: "",
  Dui: "",
  Direccion: "",
  FechaNacimiento: null,
  Responsable: "",
  Correo: "",
  VacunaCovid: 1,
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
      getEstudiante(idEstudiante);
      break;
    case 2:
      //editar
      activo.value = false;
      getEstudiante(idEstudiante);
      break;
    default:
      activo.value = false;
      break;
  }
});

const getEstudiante = async (id) => {
  const respuesta = api.get(`/estudiantes/edit/${Number(id)}`);

  const estudiante = (await respuesta).data;

  form.IdEstudiante = estudiante.IdEstudiante;
  form.PrimerNombre = estudiante.PrimerNombre;
  form.SegundoNombre = estudiante.SegundoNombre;
  form.PrimerApellido = estudiante.PrimerApellido;
  form.SegundoApellido = estudiante.SegundoApellido;
  form.Dui = estudiante.Dui;
  form.Direccion = estudiante.Direccion;
  form.FechaNacimiento = estudiante.FechaNacimiento;
  form.Responsable = estudiante.Responsable;
  form.Correo = estudiante.Correo;
  form.VacunaCovid = estudiante.VacunaCovid;
  form.IdUsuario = estudiante.IdUsuario;
};

const guardarEstudiante = () => {
  if (opcion == 0) {
    enviarSolicitud(
      "POST",
      form,
      "/estudiantes/create",
      "Registro guardado exitosamente",
      "/listar_estudiantes"
    );
  } else if (opcion == 2) {
    enviarSolicitud(
      "PUT",
      form,
      "/estudiantes/update/" + idEstudiante,
      "Registro actualizado exitosamente",
      "/listar_estudiantes"
    );
  }
};

const limpiar = () => {
  form.IdEstudiante = null;
  form.PrimerNombre = "";
  form.SegundoNombre = "";
  form.PrimerApellido = "";
  form.SegundoApellido = "";
  form.Dui = "";
  form.Direccion = "";
  form.FechaNacimiento = null;
  form.NombreResponsable = "";
  form.Correo = "";
  form.VacunaCovid = 1;
  form.IdUsuario = null;
};

const toggleUsuariosModal = () => {
  mostrarModal.value = !mostrarModal.value;
};

const establecerUsuario = (uss) => {
  form.IdUsuario = uss;
  mostrarModal.value = !mostrarModal.value;
};
</script>

<template>
  <div class="container">
    <!---->
    <Transition name="fade">
      <UsuariosModal
        TipoUsuarios="ESTUDIANTE"
        v-if="mostrarModal"
        @close="toggleUsuariosModal()"
        @dblclickUsuario="establecerUsuario"
      />
    </Transition>
    <!---->
    <h2>Guardar estudiante</h2>
    <fieldset>
      <form
        class="row g-3"
        id="Formulario"
        @submit.prevent="guardarEstudiante()"
      >
        <div class="col-md-12">
          <label for="txtIdEstudiante" id="lblIdEstudiante" hidden
            >Id Estudiante:
          </label>
          <input
            type="hidden"
            id="txtIdEstudiante"
            class="form-control"
            disabled
            v-model="form.IdEstudiante"
          />
        </div>
        <div class="col-md-6">
          <label for="txtPrimerNombre" class="form-label"
            >Primer Nombre:
          </label>
          <input
            type="text"
            class="form-control"
            id="txtPrimerNombre"
            placeholder="Escribir . . ."
            v-model="form.PrimerNombre"
            :disabled="activo"
            autofocus
          />
        </div>
        <div class="col-md-6">
          <label for="txtSegundoNombre" class="form-label"
            >Segundo Nombre:
          </label>
          <input
            type="text"
            class="form-control"
            id="txtSegundoNombre"
            placeholder="Escribir . . ."
            v-model="form.SegundoNombre"
            :disabled="activo"
          />
        </div>
        <div class="col-md-6">
          <label for="txtPrimerApellido" class="form-label"
            >Primer Apellido:
          </label>
          <input
            type="text"
            class="form-control"
            id="txtPrimerApellido"
            placeholder="Escribir . . ."
            v-model="form.PrimerApellido"
            :disabled="activo"
          />
        </div>
        <div class="col-md-6">
          <label for="txtSegundoApellido" class="form-label"
            >Segundo Apellido:
          </label>
          <input
            type="text"
            class="form-control"
            id="txtSegundoApellido"
            placeholder="Escribir . . ."
            v-model="form.SegundoApellido"
            :disabled="activo"
          />
        </div>

        <div class="col-3">
          <label for="txtDui" class="form-label">DUI: </label>
          <input
            type="text"
            class="form-control"
            id="txtDui"
            placeholder="Ejemplo: xxxxxxxx-x"
            v-model="form.Dui"
            :disabled="activo"
          />
        </div>

        <div class="col-md-9">
          <label for="txtDireccion" class="form-label">Dirección: </label>
          <input
            type="text"
            class="form-control"
            id="txtDireccion"
            placeholder="Escribir . . ."
            v-model="form.Direccion"
            :disabled="activo"
          />
        </div>

        <div class="col-md-3">
          <label for="date" class="form-label">Fecha de Nacimiento: </label>
          <input
            type="date"
            class="form-control"
            id="date"
            v-model="form.FechaNacimiento"
            :disabled="activo"
          />
        </div>

        <div class="col-md-9">
          <label for="txtResponsable" class="form-label"
            >Nombre completo del responsable:
          </label>
          <input
            type="text"
            class="form-control"
            id="txtResponsable"
            placeholder="Escribir . . ."
            v-model="form.Responsable"
            :disabled="activo"
          />
        </div>

        <div class="col-md-6">
          <label for="txtEmail" class="form-label">Correo: </label>
          <input
            type="email"
            class="form-control"
            id="txtEmail"
            placeholder="Ejemplo@correo.com"
            v-model="form.Correo"
            :disabled="activo"
          />
        </div>

        <div class="col-md-3">
          <label for="txtVacunaCovid" class="form-label">Vacuna COVID:</label>
          <select
            id="txtVacunaCovid"
            class="form-select"
            v-model="form.VacunaCovid"
            :disabled="activo"
          >
            <option value="1" selected>SI</option>
            <option value="2">NO</option>
          </select>
        </div>
        <div class="col-md-3">
          <label for="txtIdUsuario" class="form-label">Usuario:</label>
          <input
            type="text"
            class="form-control txtIdUsuario"
            id="txtIdUsuario"
            readonly
            placeholder="--Seleccionar--"
            title="haz click"
            @click="toggleUsuariosModal()"
            v-model="form.IdUsuario"
            :disabled="activo"
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
            @click="limpiar"
            :hidden="activo"
          >
            <i class="fa-solid fa-note-sticky"></i> Limpiar
          </button>
          &nbsp;
          <Router-link
            class="btn btn-warning"
            to="/listar_estudiantes"
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
