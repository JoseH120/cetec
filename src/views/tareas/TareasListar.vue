<script setup>
import { mostrarAlerta } from "@/funciones/funciones";
import { api } from "@/pluggins/axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const idActividad = parseInt(route.params.idActividad) || 0;

const Tareas = ref(null);

const activo = ref(true);

const getListarTareas = async () => {
  const respuesta = api.get(
    `/actividadesestudiantes/tareasByActividad/${Number(idActividad)}`
  );
  Tareas.value = (await respuesta).data;
};

const Modo = () => {
  activo.value = !activo.value;
  console.log(Tareas.value[1]["Nombre"]);
};

const calificar = async (id) => {
  const nota = document.getElementById("txtNota-" + id);
  if (parseFloat(nota.value) >= 0.0 && parseFloat(nota.value) <= 10.0) {
    let params = {
      Nota: nota.value,
    };
    const respuesta = await api.put(
      `/actividadesestudiantes/update/${Number(id)}`,
      params
    );
    mostrarAlerta("Nota asignada", "success");
    getListarTareas();
  } else {
    mostrarAlerta(
      "Debe ingresar un numero entre 0 y 10",
      "error",
      "txtNota-" + id
    );
  }
};

const downloadAll = () => {
  for (let i = 0; i < Tareas.value.length; i++) {
    const url = Tareas.value[i]["UrlTarea"];

    fetch(url)
      .then((resp) => resp.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = Tareas.value[i]["Nombre"];
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(() => {
        alert("error");
      });
  }
};

onMounted(() => {
  getListarTareas();
});
</script>
<template>
  <h2 class="text-muted">Tareas recibidas de</h2>
  <div class="container">
    <button
      class="btn btn-primary m-2"
      @click="downloadAll()"
      title="Descargar todas las tareas"
    >
      <i class="fa-solid fa-download"></i> Descargar
    </button>
    <button class="btn btn-link" @click="router.go(-1)">
      <i class="fa-solid fa-arrow-left"></i> Regresar
    </button>
    <div class="row">
      <label class="form-label col-2"
        >Modo:
        <select @change="Modo" class="form-control custom-select">
          <option value="1">Lectura</option>
          <option value="2">Calificacion</option>
        </select>
      </label>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="table-responsive">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tarea</th>
                <th>Calificacion</th>
                <th>ID Estudiante</th>
                <th>Estudiante</th>
                <th v-if="!activo">Guardar cambios</th>
              </tr>
            </thead>
            <tbody class="table-group-divider" id="contenido">
              <tr
                v-for="(tarea, i) in Tareas"
                :key="tarea.Idactividad_estudiante"
              >
                <td v-text="tarea.Idactividad_estudiante"></td>
                <td>
                  <a
                    :href="tarea.UrlTarea"
                    :download="tarea.Nombre"
                    target="_blank"
                    >Archivo</a
                  >
                </td>
                <td>
                  <input
                    :id="'txtNota' + '-' + tarea.Idactividad_estudiante"
                    class="form-control"
                    type="text"
                    :disabled="activo"
                    :value="tarea.Nota"
                  />
                </td>
                <td v-text="tarea.IdEstudiante"></td>
                <td v-text="tarea.Nombre"></td>
                <td v-if="!activo">
                  <button
                    class="btn btn-success"
                    @click="calificar(tarea.Idactividad_estudiante)"
                  >
                    <i class="fa-solid fa-floppy-disk"></i>
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
<style></style>
