<script setup>
import { onMounted, onUpdated, reactive, ref, watch } from "vue";
import { api } from "@/pluggins/axios";

const props = defineProps({ idCurso: Number, actividad: Object });
const form = reactive({
  IdActividad: 0,
  Tema: "",
  Descripcion: "",
  IdCurso: 0,
});

const activida = ref(props.actividad);

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
  const windowBackground = document.getElementById("window-background");
  if (e.target == windowBackground) closeWindow();
});

const closeWindow = () => {
  const windowContainer = document.getElementById("window-container");
  const windowBackground = document.getElementById("window-background");

  windowContainer.classList.add("close");

  form.IdActividad = 0;
  form.Tema = "";
  form.Descripcion ="";
  form.IdCurso= 0; 

  setTimeout(() => {
    windowContainer.classList.remove("close");
    windowBackground.style.display = "none";
  }, 1000);
};

const guardarActividad = async () => {
  const forms = document.getElementById("Formulario");

  const formulario = new FormData();
  form.IdCurso = props.idCurso;

  formulario.append("Tema", form.Tema);
  formulario.append("Descripcion", form.Descripcion);
  formulario.append("UrlRecurso", file.value);
  formulario.append("IdCurso", form.IdCurso);

  if(form.IdActividad != null){
    //Actualizar
    const respuesta = await api.post("/actividades/update/"+form.IdActividad, formulario, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Requested-With": "XMLHttpRequest",
    },
  });
  }
  else{
    //Guardar
    const respuesta = await api.post("/actividades/create", formulario, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Requested-With": "XMLHttpRequest",
    },
  });
  }
  forms.reset();
  closeWindow();
  emit("refresh");

  
};

onUpdated(()=>{
  if(props.actividad){
    if(form.IdActividad != props.actividad.IdActividad){
      form.IdActividad = props.actividad.IdActividad; 
      form.Tema = props.actividad.Tema;
      form.Descripcion = props.actividad.Descripcion;
      form.IdCurso = props.idCurso;
    }
  }
});

</script>
<template>
  <div class="body-contenido">
    <div class="window-background" id="window-background">
      <div class="window-container" id="window-container">
        <button class="close-button" id="close-button" @click="closeWindow">
          <i class="fa fa-times icon-x" aria-hidden="true"></i>
        </button>
        <h2>Recurso</h2>
        <form
          id="Formulario"
          @submit.prevent="guardarActividad()"
          enctype="multipart/form-data"
        >
          <div class="form-group row mt-2">
            <label for="IdActividad" class="col-sm-2 col-form-label" hidden
              >ID:
            </label>
            <div class="col-sm-10">
              <input
                type="number"
                class="form-control"
                id="IdActividad"
                v-model="form.IdActividad"
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
            <label for="UrlRecurso" class="col-sm-2 col-form-label"
              >Recurso:
            </label>
            <div class="col-sm-10">
              <input
                type="file"
                class="form-control"
                @change="cargarArchivo"
                id="UrlRecurso"
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

textarea {
  resize: none;
}
</style>
