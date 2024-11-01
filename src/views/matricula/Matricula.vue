<style scoped></style>
<template>
  <EstudiantesModal
    v-if="mostrarModal"
    @close="toggleEstudiantesModal()"
    @dblclickEstudiante="establecerEstudiante"
    :idCurso="idcurso"
  />
  <div class="container">
    <button class="btn btn-success m-1" @click="toggleEstudiantesModal()">
      Matricular
    </button>
    <button class="btn btn-light m-1" @click="router.go(-1)">Retrodecer</button>
    <div class="table-responsive">
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="estado.cargando">
            <th colspan="5"><h3>Cargando</h3></th>
          </tr>
          <tr
            v-else
            v-for="(estudiante, i) in estado.listado"
            :key="estudiante.IdEstudiante"
          >
            <td v-text="estudiante.IdEstudiante"></td>
            <td v-text="estudiante.Nombre"></td>
            <td v-text="estudiante.Apellido"></td>
            <td v-text="estudiante.Correo"></td>
            <td>
              <button
                class="btn btn-danger"
                @click="
                  eliminarMatricula(
                    estudiante.Nombre + ' ' + estudiante.Apellido,
                    estudiante.Idestudiante_curso
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
</template>

<script setup>
import { mostrarAlerta, enviarSolicitud } from "@/funciones/funciones";
import { api } from "@/pluggins/axios";
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";
import EstudiantesModal from "@/views/components/EstudiantesModal.vue";

const route = useRoute();
const router = useRouter();
const idcurso = route.params.idCurso || 0;
const mostrarModal = ref(false);

const estado = reactive({
  cargando: false,
  listado: {},
});

const eliminarMatricula = (nombre, idEstudiante) => {
  Swal.fire({
    title: `Desea eliminar la matricula de ${nombre}`,
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
        .delete(`/estudiantescursos/delete/${idEstudiante}`)
        .then(() => {
          mostrarAlerta("Matricula eliminada", "success");
          getMatricula();
        })
        .catch((error) => {
          mostrarAlerta("Error al eliminar matricula", "error");
        });
    } else if (result.isDismissed) {
      mostrarAlerta("Accion cancelada", "warning");
    }
  });
};

const getMatricula = async () => {
  try {
    const response = api.get(`/estudiantescursos/getListbycourse/${idcurso}`);
    estado.listado = (await response).data;
  } catch (error) {
    console.log(error);
  }
};

const toggleEstudiantesModal = () => {
  mostrarModal.value = !mostrarModal.value;
};

const establecerEstudiante = (IdEstudiante) => {
  let parametros = {
    IdEstudiante: IdEstudiante,
    IdCurso: idcurso,
  };
  api
    .post("/estudiantescursos/create", parametros)
    .then(() => {
      mostrarAlerta("Matriculado", "success");
      getMatricula();
    })
    .catch((error) => {
      mostrarAlerta("Error al matricular", "error");
    });
  toggleEstudiantesModal();
};

getMatricula();
</script>
