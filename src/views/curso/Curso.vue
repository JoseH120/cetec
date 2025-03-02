<script setup>
import SideBar from "../components/SideBar.vue";
import ActividadSave from "../actividades/ActividadSave.vue";
import TareasSave from "../tareas/TareasSave.vue";
import LeccionSave from "../leccion/LeccionSave.vue";
import SeccionItem from "../secciones/SeccionItem.vue";
import SeccionSave from "../secciones/SeccionSave.vue";

import { useRoute } from "vue-router";
import { api } from "@/pluggins/axios";
import { reactive, ref } from "vue";
import Swal from "sweetalert2";
import { mostrarAlerta } from "@/funciones/funciones";
import router from "@/router";

const route = useRoute();
const TipoUsuario = localStorage.getItem("tipo");
const IdUsuario = localStorage.getItem("idusuario");
const idCurso = ref(parseInt(route.params.idCurso));
const Actividades = ref(null);
const Lecciones = ref(null);
const idactividad = ref(0);
const Actividad = ref(null);
const Leccion = ref(null);
const Seccion = ref(null);

const Vista = ref("ACTIVIDADES");

const curso = reactive({
  IdCurso: 0,
  NombreCurso: "",
  Grupo: "",
  IdTutor: 0,
});

const getCurso = async (id) => {
  const respuesta = api.get(`/cursos/edit/${Number(id)}`);
  const Curso = (await respuesta).data;
  curso.IdCurso = Curso.IdCurso;
  curso.NombreCurso = Curso.NombreCurso;
  curso.Grupo = Curso.Grupo;
  curso.IdTutor = Curso.IdTutor;
};

const getActividades = async () => {
  try {
    const respuesta = api.get(
      `/actividades/actividadesByCurso/${idCurso.value}`
    );
    if ((await respuesta).status != 500)
      Actividades.value = (await respuesta).data;
  } catch (e) {}
};

const getLecciones = async () => {
  try {
    const respuesta = api.get(`/lecciones/leccionesByCurso/${idCurso.value}`);
    if ((await respuesta).status != 500)
      Lecciones.value = (await respuesta).data;
  } catch (e) {}
};

const openModal = (item = null) => {
  if (Vista.value == "LECCIONES") {
    // alert('Creare leccion');
    const windowBackgroundLeccion = document.getElementById(
      "window-leccion-background"
    );
    windowBackgroundLeccion.style.display = "flex";
  } else if (Vista.value == "ACTIVIDADES") {
    if (item) {
      Actividad.value = item;
    }
    const windowBackground = document.getElementById("window-background");
    windowBackground.style.display = "flex";
  } else if (Vista.value == "SECCIONES") {
    if (item) {
      Seccion.value = item;
    }
  }
};

const eliminarActividad = (actividad, id) => {
  Swal.fire({
    title: `¿Desea eliminar la actividad ${actividad}?`,
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
        .delete(`/actividades/delete/${id}`)
        .then(() => {
          getActividades();
          mostrarAlerta("Registro eliminado", "success");
        })
        .catch(() => {
          mostrarAlerta("Error al elimar", "error");
        });
    } else if (result.isDismissed) {
      //   Swal.fire("Dissmissed action of deliting");
      mostrarAlerta("Accion cancelada", "warning");
    }
  });
};

const refresh = () => {
  getCurso(idCurso.value);
  getActividades();
  getLecciones();
};

const openModalTarea = async (id) => {
  let idEstudiante = 0;
  try {
    if (TipoUsuario == "ESTUDIANTE") {
      const resp = api.get(`/estudiantes/getEstudiante/${Number(IdUsuario)}`);
      idEstudiante = (await resp).data.idestudiante;
    }
  } catch (e) {}
  try {
    if (idEstudiante > 0) {
      const respuesta = api.get(
        `/actividadesestudiantes/verTarea/${Number(id)}/${Number(idEstudiante)}`
      );
      const tmp = (await respuesta).data;
      mostrarAlerta("La tarea ya ha sido enviada", "info");
    }
  } catch (e) {
    console.log(e);
    if (e.status == 500) {
      const windowBackground = document.getElementById(
        "window-background-tarea"
      );
      windowBackground.style.display = "flex";
      idactividad.value = parseInt(id);
    }
  }
};

const VerTareas = (id) => {
  if (TipoUsuario === "TUTOR") router.push("/listar_tareas/" + id);
};

const verTarea = (idActividad) => {
  let idEstudiante = 0;
  if (TipoUsuario === "ESTUDIANTE") {
    const IdUsuario = parseInt(localStorage.getItem("idusuario"));
    api
      .get(`/estudiantes/getEstudiante/${IdUsuario}`)
      .then((res) => {
        idEstudiante = res.data.idestudiante;
        router.push("/ver_tarea/" + idActividad + "/" + idEstudiante);
      })
      .catch((e) => {
        mostrarAlerta(e.response.data.messages.error, "error");
      });
  }
};

const cambiarVista = (vista) => {
  Vista.value = vista;
};

refresh();
</script>

<template>
  <div class="Container">
    <SideBar
      class="box"
      :lista="Vista == 'ACTIVIDADES' ? Actividades : Lecciones"
      :idCurso="idCurso"
      :nombreCurso="curso.NombreCurso"
      :Vista="Vista"
    />

    <ActividadSave
      :idCurso="idCurso"
      :actividad="Actividad"
      @refresh="refresh"
    />

    <LeccionSave :idCurso="idCurso" :leccion="Leccion" @refresh="refresh" />

    <SeccionSave :idLeccion="0" />

    <TareasSave :idActividad="idactividad" />

    <div class="contenido">
      <h2>Curso de {{ curso.NombreCurso }}</h2>
      <div class="Nav">
        <ul class="Ul">
          <li class="Li">
            <label
              :class="Vista == 'ACTIVIDADES' ? 'SelectedVista Label' : 'Label'"
              @click="cambiarVista('ACTIVIDADES')"
              >Actividades</label
            >
          </li>
          <li class="Li">
            <label
              :class="Vista == 'LECCIONES' ? 'SelectedVista Label' : 'Label'"
              @click="cambiarVista('LECCIONES')"
              >Lecciones</label
            >
          </li>
        </ul>
      </div>
      <div>
        <button
          v-if="TipoUsuario != 'ESTUDIANTE'"
          class="open-button mb-2"
          id="open-button"
          @click="openModal"
        >
          <i class="fa fa-plus" aria-hidden="true"></i> {{ Vista }}
        </button>
      </div>

      <section
        v-if="Vista == 'ACTIVIDADES'"
        v-for="(act, i) in Actividades"
        :key="act.IdActividad"
        :id="act.IdActividad"
        @dblclick="VerTareas(act.IdActividad)"
        class="cursor"
      >
        <h3
          class="cursor"
          v-text="act.Tema"
          @click="VerTareas(act.IdActividad)"
        ></h3>
        <p v-text="act.Descripcion"></p>
        <a :href="act.UrlRecurso" target="_blank">Archivo</a>
        <div class="acciones">
          <button
            v-if="TipoUsuario != 'ESTUDIANTE'"
            class="btn btn-danger"
            @click="eliminarActividad(act.Tema, act.IdActividad)"
          >
            <i class="fa fa-trash"></i>
          </button>
          <button
            v-if="TipoUsuario != 'ESTUDIANTE'"
            class="btn btn-info"
            @click="openModal(act)"
          >
            <i class="fa fa-pencil" aria-hidden="true"></i>
          </button>
          <button
            v-if="TipoUsuario != 'TUTOR'"
            class="btn btn-light"
            title="Subir tarea"
            @click="openModalTarea(act.IdActividad)"
          >
            <i class="fa-solid fa-upload"></i>
          </button>
          <button
            v-if="TipoUsuario != 'TUTOR'"
            class="btn btn-link"
            title="Ver tarea enviada"
            @click="verTarea(act.IdActividad)"
          >
            <i class="fa-solid fa-eye"></i>
          </button>
          <button
            v-if="TipoUsuario != 'ESTUDIANTE'"
            class="btn btn-light"
            title="Descargar tareas de los estudiantes"
          >
            <i class="fa-solid fa-download"></i>
          </button>
        </div>
      </section>
      <section
        v-else
        v-for="(lec, i) in Lecciones"
        :key="lec.IdLeccion"
        :id="lec.IdLeccion"
      >
        <h3 v-text="lec.Tema"></h3>
        <p v-text="lec.Descripcion"></p>
        <a :href="lec.Url">enlace</a>

        <SeccionItem :IdLeccion="lec.IdLeccion"></SeccionItem>
      </section>
    </div>
  </div>
</template>

<style scoped>
.Container {
  display: flex;
  width: 100%;
}

.box {
  text-align: center;
}

.contenido {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 10px;
}

.acciones {
  display: flex;
  flex-direction: row-reverse;
  margin-right: 10px;
}

h2,
section {
  padding-left: 5%;
  padding-top: 10px;
  padding-bottom: 10px;
}

section {
  border: 3px solid rgb(178, 192, 255, 0.2);
  border-radius: 30px;
  margin: 1px;
}

.open-button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: #28a745;
  color: #f7f9ff;
  border: none;
  transition: transfom 0.3 cubic-bezier(0.36, 0.37, 0.76, 0.75);
  cursor: pointer;
}
.open-button:active {
  transform: scale(0.95);
}

.cursor:hover {
  cursor: pointer;
}

.Nav {
  float: left;
  width: 100%;
  margin-bottom: 0;
}
.Ul {
  list-style: none;
  overflow: hidden;
}
.Li {
  float: left;
  font-size: 20px;
}

.Label {
  display: block;
  padding: 5px;
  border-radius: 10px;
  color: darkgrey;
}

.SelectedVista {
  cursor: pointer;
  background-color: lightgray;
  color: black;
}

.Label:hover {
  cursor: pointer;
  background-color: lightgray;
  color: black;
}
</style>
