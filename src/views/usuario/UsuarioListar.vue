<script setup>
import { mostrarAlerta } from "@/funciones/funciones";
import { api } from "@/pluggins/axios";
import Swal from "sweetalert2";
import { reactive } from "vue";
const estado = reactive({ usuarios: {}, cargando: false });
const getUsuarios = async () => {
  try {
    const response = api.get("/usuarios");
    estado.usuarios = (await response).data;
  } catch (error) {}
};
const eliminar = (id, user) => {
  Swal.fire({
    title: `¿Desea eliminar el usuario ${user}?`,
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
        .delete(`/usuarios/delete/${id}`)
        .then(() => {
          mostrarAlerta("Registro eliminado", "success");
          getUsuarios();
        })
        .catch(() => {
          mostrarAlerta("Error al eliminar", "error");
        });
    } else if (result.isDismissed) {
      mostrarAlerta("Accion cancelada", "warning");
    }
  });
};
getUsuarios();
</script>

<template>
  <div class="container">
    <h2>Lista de usuarios</h2>
    <RouterLink class="btn btn-success color-with" to="/guardar_usuario/0/0">
      <i class="fa-solid fa-plus"></i> Agregar
    </RouterLink>
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <div class="table-responsive">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Correo</th>
                <th>Tipo de usuario</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody class="table-group-divider" id="contenido">
              <tr v-if="estado.cargando">
                <th colspan="4"><h3>Cargando . . .</h3></th>
              </tr>
              <tr
                v-else
                v-for="(uss, i) in estado.usuarios"
                :key="uss.IdUsuario"
              >
                <td v-text="uss.IdUsuario"></td>
                <td v-text="uss.Usuario"></td>
                <td v-text="uss.email"></td>
                <td v-text="uss.Tipo"></td>
                <td>
                  <RouterLink
                    :to="{ path: 'guardar_usuario/' + uss.IdUsuario + '/1' }"
                    class="btn btn-info m-1"
                  >
                    <i class="fa-solid fa-eye"></i>
                  </RouterLink>
                  <RouterLink
                    :to="{ path: 'guardar_usuario/' + uss.IdUsuario + '/2' }"
                    class="btn btn-warning m-1"
                  >
                    <i class="fa-solid fa-edit"></i>
                  </RouterLink>
                  <button
                    class="btn btn-danger m-1"
                    @click="eliminar(uss.IdUsuario, uss.Usuario)"
                  >
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
@media (min-width: 720px) {
}
</style>
