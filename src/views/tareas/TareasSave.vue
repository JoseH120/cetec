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

.window-background {
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

.window-container {
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

.close {
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

</style>
<template>
<div class="body-contenido">
    <div class="window-background" id="window-background-tarea">
      <div class="window-container" id="window-container-tarea">
        <button class="close-button" id="close-button-tarea" @click="closeWindow">
          <i class="fa fa-times icon-x" aria-hidden="true"></i>
        </button>
        <h2>{{ Titulo }}</h2>
        <form
          id="Form-tarea"
          @submit.prevent="subirTarea"
          enctype="multipart/form-data"
        >
        <div class="form-group row mt-2">
            <label for="Idactividad_estudiante" class="col-sm-2 col-form-label" hidden
              >ID Activida Estudiante:
            </label>
            <div class="col-sm-10">
              <input
                type="number"
                v-model="form.Idactividad_estudiante"
                class="form-control"
                id="Idactividad_estudiante"
                hidden
                disabled
              />
            </div>
          </div>

          <div class="form-group row mt-2">
            <label for="IdActividad" class="col-sm-2 col-form-label" hidden
              >ID:
            </label>
            <div class="col-sm-10">
              <input
                type="number"
                v-model="form.IdActividad"
                class="form-control"
                id="IdActividad"
                hidden
                disabled
              />
            </div>
          </div>

          <div class="form-group row mt-2">
            <label for="IdEstudiante" class="col-sm-2 col-form-label" hidden
              >ID Estudiante:
            </label>
            <div class="col-sm-10">
              <input
                type="number"
                v-model="form.IdEstudiante"
                class="form-control"
                id="IdEstudiante"
                hidden
                disabled
              />
            </div>
          </div>      

          <div class="form-group row mt-2">
            <label for="UrlTarea" class="col-sm-2 col-form-label"
              >Tarea:
            </label>
            <div class="col-sm-10">
              <input
                type="file"
                class="form-control"
                @change="cargarArchivo"
                id="UrlTarea"
                required
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
                id="IdActividad"
                hidden
                disabled
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
<script setup>
import { reactive, ref, onMounted } from 'vue';
import { api } from "@/pluggins/axios";

let Titulo = ref('Subir Tarea');

const props = defineProps({idActividad: Number});

const idUsuario = localStorage.getItem('idusuario');
const TipoUsuario = localStorage.getItem('tipo');
const activo = ref(true);
const file = ref(null);

const form = reactive({
    Idactividad_estudiante: 0,
    Nota: null,
    IdActividad: 0,
    IdEstudiante:0
});


const closeWindow = () => {
  const windowContainer = document.getElementById("window-container-tarea");
  const windowBackground = document.getElementById("window-background-tarea");
  const formulario = document.getElementById("Form-tarea");

  windowContainer.classList.add("close");

  setTimeout(() => {
    windowContainer.classList.remove("close");
    windowBackground.style.display = "none";
  }, 1000);

  formulario.reset();
};

window.addEventListener("click", (e) => {
  const windowBackground = document.getElementById("window-background-tarea");
  if (e.target == windowBackground){
    closeWindow();
  }
    
});

const cargarArchivo = (e) => {
  if (e.target.files[0]) {
    file.value = e.target.files[0];
  } else {
    file.value = null;
  }
};

const getIdEstudiante = async () =>{
  if(TipoUsuario === "ESTUDIANTE" ){
    const respuesta = api.get(`/estudiantes/getEstudiante/${Number(idUsuario)}`);
    form.IdEstudiante = (await respuesta).data.idestudiante;
  }
    
}

const subirTarea = async () =>{
    const Form = document.getElementById("Form-tarea");

    const formulario = new FormData();
    form.IdActividad = props.idActividad;

    formulario.append("Nota", 0.00);
    formulario.append("IdActividad", form.IdActividad);
    formulario.append("UrlTarea", file.value);
    formulario.append("IdEstudiante", form.IdEstudiante);
    
    const respuesta = await api.post("/actividadesestudiantes/create", formulario, {
        headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Requested-With": "XMLHttpRequest",
            },
    });

    closeWindow();
    Form.reset();
}

onMounted(()=>{
  
  switch(TipoUsuario){
    case 'TUTOR':
      activo.value = false;
      break;
    case 'ESTUDIANTE':
      activo.value = true;
      break;
    case 'ADMINISTRADOR':
      nota.readOnly = true;
      break;
    default:
      nota.readOnly = true;
      break;
  }
});
getIdEstudiante();
</script>