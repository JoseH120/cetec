<style>
td,
th {
  font-size: small;
}
</style>

<template>
  <div class="container-lg">
    <h2>Lista de cursos</h2>
    <Router-link class="btn btn-success color-with m-1" to="/guardar_curso">
      <i class="fa-solid fa-plus"></i> Agregar
    </Router-link>
    <div class="row">
      <div class="table-responsive">
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Curso</th>
              <th>Descripcion</th>
              <th>Grupo</th>
              <th>Id Tutor</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody class="table-group-divider" id="contenido">
            <tr v-if="estado.cargando">
              <th colspan="6"><h3>Cargando . . .</h3></th>
            </tr>
            <tr v-else v-for="(cur, i) in estado.cursos" :key="cur.IdCurso">
              <td v-text="cur.IdCurso"></td>
              <td v-text="cur.NombreCurso"></td>
              <td v-text="cur.Descripcion"></td>
              <td v-text="cur.Grupo"></td>
              <td v-text="cur.IdTutor"></td>
              <td>
                <RouterLink
                  :to="{ path: 'guardar_curso/' + cur.IdCurso + '/1' }"
                  class="btn btn-info m-1"
                >
                  <i class="fa-solid fa-eye"></i>
                </RouterLink>
                <RouterLink
                  :to="{ path: 'guardar_curso/' + cur.IdCurso + '/2' }"
                  class="btn btn-warning m-1"
                >
                  <i class="fa-solid fa-edit"></i>
                </RouterLink>
                <button
                  class="btn btn-danger m-1"
                  v-on:click="eliminar(cur.IdCurso, cur.NombreCurso, cur.Grupo)"
                >
                  <i class="fa-solid fa-trash-can"></i>
                </button>
                <RouterLink
                  :to="{ path: 'matricula/' + cur.IdCurso }"
                  class="btn btn-ligth m-1"
                >
                  <i class="fa fa-user-plus" aria-hidden="true"></i>
                </RouterLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <RouterView />
  </div>
</template>

<script setup>
import { mostrarAlerta } from "@/funciones/funciones";
import { api } from "@/pluggins/axios";
import Swal from "sweetalert2";
import { reactive } from "vue";

const estado = reactive({
  cursos: {},
  cargando: false,
});

const getCursos = async () => {
  try {
    const respuesta = api.get("/cursos");
    estado.cursos = (await respuesta).data;
    estado.cargando = false;
  } catch (error) {
    estado.cargando = true;
    console.log(error);
    mostrarAlerta("There was an error", "error");
  }
};

const eliminar = (id, curso) => {
  Swal.fire({
    title: `De verdad desea eliminar el curso ${curso}`,
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
        .delete(`/cursos/delete/${id}`)
        .then(() => {
          mostrarAlerta("Registro eliminado", "success");
          getCursos();
        })
        .catch(() => {
          mostrarAlerta("Error elimando", "error");
        });
    } else if (result.isDismissed) {
      //   Swal.fire("Dissmissed action of deliting");
      mostrarAlerta("Accion cancelada", "warning");
    }
  });
};

getCursos();
</script>
