<script setup>
import { onMounted, onUpdated, reactive, ref } from "vue";
import { api } from "@/pluggins/axios";
import Swal from "sweetalert2";

// Constante que sostendra el sweataert
const AgregarSeccionesSWAL = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success me-3",
    cancelButton: "btn btn-danger",
  },
});
// variable reactiva para cambiar el tipo de recurso a indexar a la leccion.
const recurso = reactive({
  tipo: "",
  activar: false,
});

const props = defineProps({ idCurso: Number, leccion: Object });
const form = reactive({
  IdLeccion: null,
  Tema: "",
  Descripcion: "",
  Url: "",
  FechaPublicacion: "",
  IdCurso: null,
});

const leccion = ref(props.leccion);

const emit = defineEmits(["refresh"]);

const file = ref(null);

//Cuando cambia el arcchivo actualiza la variable file
const cargarArchivo = (e) => {
  if (e.target.files[0]) {
    file.value = e.target.files[0];
  } else {
    file.value = null;
  }
};

window.addEventListener("click", (e) => {
  const windowBackground = document.getElementById("window-leccion-background");
  if (e.target == windowBackground) closeWindow();
});

const closeWindow = () => {
  const windowContainer = document.getElementById("window-leccion-container");
  const windowBackground = document.getElementById("window-leccion-background");

  windowContainer.classList.add("close-form");

  setTimeout(() => {
    windowContainer.classList.remove("close-form");
    windowBackground.style.display = "none";
  }, 1000);
};

const guardarLeccion = async () => {
  const forms = document.getElementById("Formulario");

  const formulario = new FormData();
  form.IdCurso = props.idCurso;

  formulario.append("Tema", form.Tema);
  formulario.append("Descripcion", form.Descripcion);

  // Validando si es url o archivo local.
  recurso.activar
    ? recurso.tipo == "enlace"
      ? formulario.append("Url", form.Url)
      : recurso.tipo == "archivo"
      ? formulario.append("Url", file.value)
      : ""
    : "";
  formulario.append("FechaPublicacion", form.FechaPublicacion);
  formulario.append("IdCurso", form.IdCurso);

  if (form.IdLeccion != null) {
    //Actualizar
    const respuesta = await api.post(
      "/lecciones/update/" + form.IdLeccion,
      formulario,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );
  } else {
    //Guardar
    const respuesta = await api
      .post("/lecciones/create", formulario, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Requested-With": "XMLHttpRequest",
        },
      })
      .then((response) => {
        AgregarSeccionesSWAL.fire({
          title: "¿Desea agregar secciones?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText:
            '<i class="fa-solid fa-square-check"></i>Si, agregar',
          cancelButtonText:
            '<i class="fa-solid fa-circle-xmark"></i>No agregar',
        }).then((res) => {
          if (res.isConfirmed) {
            forms.reset();
            closeWindow();
            emit("refresh", response.data.IdLeccion);
          } else {
            closeWindow();
            forms.reset();
            emit("refresh");
          }
        });
      });
  }

  // forms.reset();
  // closeWindow();
  // emit("refresh");
};

onMounted(() => {
  fechaActual();
});

onUpdated(() => {
  // fechaActual();
  if (props.leccion) {
    if (form.IdLeccion != props.leccion.IdLeccion) {
      form.IdLeccion = props.leccion.IdLeccion;
      form.Tema = props.leccion.Tema;
      form.Descripcion = props.leccion.Descripcion;
      form.IdCurso = props.idCurso;
      // form.FechaPublicacion = props.FechaPublicacion;
    }
  }
});

const fechaActual = () => {
  var hoy = new Date();
  var fecha =
    hoy.getFullYear() +
    "-" +
    ("0" + (hoy.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + hoy.getDate()).slice(-2);
  var hora =
    ("0" + hoy.getHours()).slice(-2) + ":" + ("0" + hoy.getMinutes()).slice(-2);

  var fecha_hora = fecha + "T" + hora;
  document.getElementById("FechaPublicacion").value = fecha_hora;
};
</script>
<template>
  <div class="body-contenido">
    <div class="window-leccion-background" id="window-leccion-background">
      <div class="window-leccion-container" id="window-leccion-container">
        <button class="close-button" id="close-button" @click="closeWindow">
          <i class="fa fa-times icon-x" aria-hidden="true"></i>
        </button>
        <h2>Leccion</h2>
        <form
          id="Formulario"
          @submit.prevent="guardarLeccion()"
          enctype="multipart/form-data"
        >
          <div class="form-group row mt-2">
            <label for="IdLeccion" class="col-sm-2 col-form-label" hidden
              >ID:
            </label>
            <div class="col-sm-10">
              <input
                type="number"
                class="form-control"
                id="IdLeccion"
                v-model="form.IdLeccion"
                hidden
                disabled
              />
            </div>
          </div>

          <div class="form-group row mt-2">
            <label for="Tema" class="col-sm-2 col-form-label">Tema: </label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="Tema"
                v-model="form.Tema"
                required
                autofocus
              />
            </div>
          </div>

          <div class="form-group row mt-2">
            <label for="Descripcion" class="col-sm-2 col-form-label"
              >Descripcion:
            </label>
            <div class="col-sm-10">
              <textarea
                id="Descripcion"
                class="form-control"
                v-model="form.Descripcion"
                required
              >
              </textarea>
            </div>
          </div>

          <div class="form-group row mt-2">
            <label for="" class="col-sm-2 col-form-label"
              >Recurso: <input type="checkbox" v-model="recurso.validar" />
              {{ recurso.validar ? "Si" : "No" }}
            </label>

            <div class="col-sm-10">
              <select
                class="form-control"
                v-model="recurso.tipo"
                :disabled="!recurso.validar"
              >
                <option value="enlace" selected>Enlace</option>
                <option value="archivo">Archivo</option>
              </select>
              <input
                v-if="recurso.tipo == 'archivo'"
                type="file"
                class="form-control"
                @change="cargarArchivo"
                id="UrlRecurso"
                :disabled="!recurso.validar"
              />
              <input
                v-else
                class="form-control"
                type="text"
                id="Url"
                placeholder="pegar enlace"
                :disabled="!recurso.validar"
              />
            </div>
          </div>

          <div class="form-group row mt-2">
            <label for="IdCurso" class="col-sm-2 col-form-label" hidden
              >ID Curso:
            </label>
            <div class="col-sm-10">
              <input
                type="number"
                class="form-control"
                id="IdCurso"
                v-model="form.IdCurso"
                value="{{props.idCurso}}"
                hidden
                disabled
              />
            </div>
          </div>

          <div class="form-group row mt-2">
            <label for="FechaPublicacion" class="col-sm-2 col-form-label"
              >Fecha publicación:
            </label>
            <div class="col-sm-10">
              <input
                type="datetime-local"
                class="form-control"
                id="FechaPublicacion"
                v-model="form.FechaPublicacion"
              />
            </div>
          </div>

          <button type="submit" class="btn btn-primary">
            <i class="fa-solid fa-floppy-disk"></i> Guardar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<style scoped>
* {
  box-sizing: border-box;
}

.body-contenido {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background-color: white;
  min-height: calc(100vh - 100px);
  max-width: 100vw;
  margin: 100px 0 0 0;
}

.window-leccion-background {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  backdrop-filter: blur(4px);
  background-color: rgb(255, 255, 255, 0.3);
  z-index: 1;
  display: none;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.window-leccion-container {
  position: relative;
  background-color: #fff;
  width: 600px;
  height: auto;
  padding: 1.5rem;
  border-radius: 8px;
  animation-name: modal;
  animation-duration: 0.5s;
  box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.4);
  z-index: 10;
}

@keyframes modal {
  from {
    transform: translateY(50vh);
  }

  to {
    transform: translateY(0);
  }
}

.close-form {
  transition: transform 1s cubic-bezier(0, -0.42, 1, -0.41);
  transform: translateY(60vh);
}

.close-button {
  position: absolute;
  border-radius: 50%;
  top: -15px;
  right: -15px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #eee;
  cursor: pointer;
}

.icon-x {
  fill: rgb(54, 54, 54);
}

textarea {
  resize: none;
}
</style>
