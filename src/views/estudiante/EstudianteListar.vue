<style scoped>
td,
th {
  font-size: small;
}
</style>

<script setup>
import { mostrarAlerta } from "@/funciones/funciones";
import { api } from "@/pluggins/axios";
import Swal from "sweetalert2";
import { reactive } from "vue";
const estado = reactive({ estudiantes: {}, cargando: false });

const getEstudiantes = async () => {
  try {
    const response = api.get("/estudiantes");
    estado.estudiantes = (await response).data;
  } catch (error) {
    console.log(error);
    estado.cargando = true;
  }
};

const eliminar = (id, estudiante) => {
  Swal.fire({
    title: `¿Desea eliminar el estudiante ${estudiante}?`,
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
        .delete(`/estudiantes/delete/${id}`)
        .then(() => {
          mostrarAlerta("Registro eliminado", "success");
          getEstudiantes();
        })
        .catch(() => {
          mostrarAlerta("Error al eliminar", "error");
        });
    } else if (result.isDismissed) {
      mostrarAlerta("Accion cancelada", "warning");
    }
  });
};

getEstudiantes();
</script>

<template>
  <div class="container">
    <h2>Lista de Estudiantes</h2>
    <Router-link class="btn btn-success color-with" to="/guardar_estudiante">
      <i class="fa-solid fa-plus"></i> Agregar
    </Router-link>
    <div class="row">
      <div class="table-responsive">
        &nbsp;
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>DUI</th>
              <th>Direccion</th>
              <th>Fecha Nacimiento</th>
              <th>Responsable</th>
              <th>Correo</th>
              <th>Vacuna Covid</th>
              <th>Id Usuario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody class="table-group-divider" id="contenido">
            <tr v-if="estado.cargando">
              <th colspan="11"><h3>Cargando . . .</h3></th>
            </tr>
            <tr
              v-else
              v-for="(stu, i) in estado.estudiantes"
              :key="stu.IdEstudiante"
            >
              <td v-text="stu.IdEstudiante"></td>
              <td v-text="stu.PrimerNombre + ' ' + stu.SegundoNombre"></td>
              <td v-text="stu.PrimerApellido + ' ' + stu.SegundoApellido"></td>
              <td v-text="stu.Dui"></td>
              <td v-text="stu.Direccion"></td>
              <td v-text="stu.FechaNacimiento"></td>
              <td v-text="stu.Responsable"></td>
              <td v-text="stu.Correo"></td>
              <td v-text="stu.VacunaCovid"></td>
              <td v-text="stu.IdUsuario"></td>
              <td>
                <RouterLink
                  :to="{
                    path: 'guardar_estudiante/' + stu.IdEstudiante + '/1',
                  }"
                  class="btn btn-info m-1"
                >
                  <i class="fa-solid fa-eye"></i>
                </RouterLink>
                <RouterLink
                  :to="{
                    path: 'guardar_estudiante/' + stu.IdEstudiante + '/2',
                  }"
                  class="btn btn-warning m-1"
                >
                  <i class="fa-solid fa-edit"></i>
                </RouterLink>
                <button
                  class="btn btn-danger m-1"
                  v-on:click="
                    eliminar(
                      stu.IdEstudiante,
                      `${stu.PrimerNombre} ${stu.PrimerApellido}`
                    )
                  "
                >
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <RouterView />
  </div>
</template>
