<script setup>
import { onUpdated, reactive, ref } from "vue";
import { api } from "@/pluggins/axios";
import Swal from "sweetalert2";

// Definir una constante que contendran las variables props desde Leccion.
const props = defineProps({
  IdLeccion: String,
  TemaLeccion: String,
  seccion: Object,
});

// Establecer emit para seccionlistar
const emit = defineEmits(["refresh"]);

// variable reactiva para cambiar el tipo de recurso a indexar a la seccion.
const recurso = reactive({
  tipo: "",
  activar: false,
});

// constante que vincula los campos del formulario
const form = reactive({
  IdSeccion: null,
  IdLeccion: null,
  Contenido: "",
  Url: "",
});

// constante que contendra referencia a un archivo local subido
const file = ref(null);

//Cuando cambia el arcchivo actualiza la variable file
const cargarArchivo = (e) => {
  if (e.target.files[0]) {
    file.value = e.target.files[0];
  } else {
    file.value = null;
  }
};

// Metodo que cierra ventana del formulario al dar click fuera del formulario
window.addEventListener("click", (e) => {
  const windowBackground = document.getElementById("window-background-seccion");
  if (e.target == windowBackground) closeWindow();
});

// Metodo para cerrar la ventana formulario
const closeWindow = () => {
  const windowContainer = document.getElementById("window-container-seccion");
  const windowBackground = document.getElementById("window-background-seccion");

  windowContainer.classList.add("close-form");

  setTimeout(() => {
    windowContainer.classList.remove("close-form");
    windowBackground.style.display = "none";
  }, 1000);
};

// Metodo que se ejecuta para enviar peticion de crear un registro a url
// http://localhost/sistema/api/secciones/crear
// Que cuenta con un formulario en el body de la solicitud
const guardarSeccion = async () => {
  const forms = document.getElementById("Formulario");
  //Declaramos una constante que contendra el valor del POST
  const formulario = new FormData();
  // Asignamos el props IdLeccion a la propiedad IdLeccion del objeto form
  formulario.append("IdLeccion", props.IdLeccion);
  // Definicion de las propiedades que se enviaran en la solicitud a la API
  formulario.append("Contenido", form.Contenido);
  if (recurso.tipo != "") {
    formulario.append("TipoTecurso", recurso.tipo);
  }
  // Validando si el recurso es una url o un archivo local.
  if(recurso.tipo == "enlace"){
    formulario.append("Url", form.Url);
  }
  else if(recurso.tipo == "archivo"){
    formulario.append("file", file.value)
  }

  // Validamos si una seccion esta creandose o editandose
  if (form.IdSeccion != null) {
    //Actualizar seccion
    api.post("/secciones/update/" + form.IdSeccion, formulario, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
  } else {
    const respuesta = await api.post("/secciones/create", formulario, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    Swal.fire({
      title: "Operacion exitosa",
      text: "Registro ingresado correctamente",
      icon: "success",
    });
  }
  forms.reset();
  closeWindow();
  emit("refresh");
};

onUpdated(() => {
  if (props.seccion) {
    form.IdLeccion = props.seccion.IdLeccion;
    form.Contenido = props.seccion.Contenido;
    form.Url = props.seccion.Url;
  }
});
</script>
<template>
  <div class="body-contenido">
    <div class="window-background-seccion" id="window-background-seccion">
      <div class="window-container-seccion" id="window-container-seccion">
        <button class="close-button" id="close-button" @click="closeWindow">
          <i class="fa fa-times icon-x" aria-hidden="true"></i>
        </button>
        <h2>Leccion</h2>
        <form
          id="Formulario"
          @submit.prevent="guardarSeccion()"
          enctype="multipart/form-data"
        >
          <div class="form-group row mt-2">
            <label for="IdSeccion" class="col-sm-2 col-form-label" hidden
              >ID:
            </label>
            <div class="col-sm-10">
              <input
                type="number"
                class="form-control"
                id="IdLeccion"
                v-model="form.IdSeccion"
                hidden
                disabled
              />
            </div>
          </div>

          <div class="form-group row mt-2">
            <label for="Contenido" class="col-sm-2 col-form-label"
              >Contenido:
            </label>
            <div class="col-sm-10">
              <textarea
                id="Contenido"
                class="form-control"
                v-model="form.Contenido"
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
                v-model="form.Url"
                placeholder="pegar enlace"
                :disabled="!recurso.validar"
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

.window-background-seccion {
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

.window-container-seccion {
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
