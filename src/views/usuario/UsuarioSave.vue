<script setup>
import { api } from "@/pluggins/axios";
import { reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import { enviarSolicitud } from "@/funciones/funciones";
const route = useRoute();
const idUsuario = route.params.id;
const opcion = route.params.case;
const form = reactive({
  IdUsuario: "",
  usuario: "",
  email: "",
  clave: "",
  tipo: null,
});

const estado = reactive({
  usuario: {},
  desactivar: false,
  cambiarClave: false,
});

onMounted(() => {
  switch (Number(opcion)) {
    case 0:
      estado.desactivar = false;
      break;
    case 1:
      estado.desactivar = true;
      getUsuario(idUsuario);
      break;
    case 2:
      estado.desactivar = false;
      estado.cambiarClave = false;
      getUsuario(idUsuario);
      break;
  }
});

const getUsuario = async (id) => {
  const respuesta = api.get(`/usuarios/edit/${Number(id)}`);
  estado.usuario = (await respuesta).data;
  form.IdUsuario = estado.usuario.IdUsuario;
  form.usuario = estado.usuario.Usuario;
  form.email = estado.usuario.email;
  form.tipo = estado.usuario.Tipo;
  form.clave = null;
};

const guardarUsuario = () => {
  const params = {
    usuario: "",
    email: "",
    clave: "",
    tipo: "",
  };
  // Opcion de editar usuario
  if (opcion != 0) {
    params.usuario = form.usuario;
    // estado.usuario.email != form.email
    form.email != null
      ? (params.email = form.email)
      : console.log("delete params.email");
    form.clave != null && estado.cambiarClave
      ? (params.clave = form.clave)
      : delete params.clave;
    params.tipo = form.tipo;
    enviarSolicitud(
      "PUT",
      params,
      "/usuarios/update/" + idUsuario,
      "Registro guardado exitosamente",
      "/listar_usuarios"
    );
  }
  // opcion de guardar nuevo usuario
  else {
    params.usuario = form.usuario;
    params.email = form.email;
    params.clave = form.clave;
    params.tipo = form.tipo;
    enviarSolicitud(
      "POST",
      params,
      "/usuarios/create",
      "Registro guardado exitosamente",
      "/listar_usuarios"
    );
  }
};
const limpiarCampos = () => {
  form.usuario = "";
  form.email = "";
  form.clave = "";
  form.tipo = null;
};
</script>

<template>
  <div class="container-md">
    <h2>Registrar usuario</h2>
    <fieldset>
      <form @submit.prevent="guardarUsuario()">
        <label for="txtIdUsuario" class="form-label" id="lblIdUduario" hidden>
          Id Usuario:
        </label>
        <input
          type="hidden"
          id="txtIdUsuario"
          class="form-control"
          v-model="form.IdUsuario"
        />

        <label for="txtUsuario" class="form-label">Usuario: </label>
        <input
          type="text"
          v-model="form.usuario"
          name="txtUsuario"
          id="txtUsuario"
          placeholder="Ingresar usuario..."
          class="form-control"
          :disabled="estado.desactivar"
        />
        <br />

        <label for="txtEmail" class="form-label">Email: </label>
        <input
          type="text"
          v-model="form.email"
          name="txtEmail"
          id="txtEmail"
          placeholder="Ingresar email..."
          class="form-control"
          :disabled="estado.desactivar"
          required
        />
        <br />

        <label for="txtClave">Contraseña: </label>
        <input type="checkbox" v-model="estado.cambiarClave" />
        <input
          type="password"
          v-model="form.clave"
          name="txtPassword"
          id="txtPassword"
          placeholder="Ingresar clave..."
          class="form-control"
          autocomplete="off"
          :disabled="estado.desactivar || !estado.cambiarClave"
          required
        />
        <br />

        <label for="cbTipo">Tipo: </label>
        <select
          v-model="form.tipo"
          name="cbTipo"
          id="cbTipo"
          class="form-select"
          :disabled="estado.desactivar"
          required
        >
          <option value="null">-- Seleccionar --</option>
          <option value="ADMINISTRADOR">ADMINISTRADOR</option>
          <option value="TUTOR">TUTOR</option>
          <option value="ESTUDIANTE">ESTUDIANTE</option>
        </select>
        <br />

        <div class="d-grid gap-2 d-md-block">
          <button
            v-show="!estado.desactivar"
            class="btn btn-primary boton"
            id="btnGuardar"
            :disabled="estado.editar"
          >
            <i class="fa-solid fa-floppy-disk"></i> Guardar
          </button>
          &nbsp;
          <button
            v-show="!estado.lectura"
            v-if="!estado.desactivar"
            id="btnLimpiar"
            class="btn btn-light"
            @click.prevent="limpiarCampos()"
          >
            <i class="fa-solid fa-note-sticky"></i> Limpiar
          </button>
          &nbsp;
          <Router-link
            class="btn btn-warning"
            to="/listar_usuarios"
            id="btnRegresar"
          >
            <i class="fa-solid fa-square-caret-left"></i> Regresar
          </Router-link>
        </div>
      </form>
    </fieldset>
  </div>
</template>

<style scoped>
@media (min-width: 720px) {
  form {
    max-width: 720px;
    margin-left: 20%;
    margin-right: 20%;
  }
}
.boton {
  padding: 5px 20px;
}
</style>
