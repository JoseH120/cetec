<script setup>

import { reactive, ref } from "vue";
import { api } from "@/pluggins/axios"
import router from "@/router";

const props = defineProps({idCurso: Number});
const form = reactive({
    Tema: '',
    Descripcion: '',
    IdCurso: 0
});

const emit = defineEmits(['refresh']);

const file = ref(null);

//Cuando cambia el arcchivo actualiza la variable file 
const cargarArchivo = (e) =>{
    if(e.target.files[0]){
        file.value = e.target.files[0];         
    } 
    else{
        file.value = null;
    }     
}

window.addEventListener('click', (e)=>{
    const windowBackground = document.getElementById('window-background');
    if(e.target == windowBackground) 
        closeWindow();
});

const closeWindow = () =>{
    const windowContainer = document.getElementById('window-container');
    const windowBackground = document.getElementById('window-background');

    windowContainer.classList.add('close');

    setTimeout(() =>{
        windowContainer.classList.remove('close');
        windowBackground.style.display = 'none';
    }, 1000);
}

const guardarActividad = async () =>{
    const formulario = new FormData();
    form.IdCurso = props.idCurso;

    formulario.append("Tema", form.Tema);
    formulario.append("Descripcion", form.Descripcion);
    formulario.append("UrlRecurso", file.value);
    formulario.append("IdCurso", form.IdCurso);

    const respuesta = await api.post('/actividades/create', formulario, {headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "X-Requested-With": "XMLHttpRequest",
  }});

    closeWindow();
    emit("refresh");
}



</script>
<template>
    <div class="body-contenido">
        <div class="window-background" id="window-background">
            <div class="window-container" id="window-container">
                <button class="close-button" id="close-button" @click="closeWindow">
                    <i class="fa fa-times icon-x" aria-hidden="true"></i>
                </button>
                <h2>Recurso</h2>
                <form @submit.prevent="guardarActividad()" enctype="multipart/form-data">
                    <div class="form-group row mt-2">
                        <label for="IdActividad" class="col-sm-2 col-form-label" hidden>ID: </label>
                        <div class="col-sm-10">
                            <input type="number" class="form-control" id="IdActividad" hidden disabled>
                        </div>
                    </div>

                    <div class="form-group row mt-2">
                        <label for="Tema" class="col-sm-2 col-form-label">Tema: </label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="Tema" v-model="form.Tema" autofocus required>
                        </div>
                    </div>

                    <div class="form-group row mt-2">
                        <label for="Descripcion" class="col-sm-2 col-form-label">Descripcion: </label>
                        <div class="col-sm-10">
                            <textarea id="Descripcion" class="form-control" v-model="form.Descripcion" required>
                            </textarea>
                        </div>
                    </div>

                    <div class="form-group row mt-2">
                        <label for="UrlRecurso" class="col-sm-2 col-form-label">Recurso: </label>
                        <div class="col-sm-10">
                            <input type="file" class="custom-file-input" @change="cargarArchivo" id="UrlRecurso" required>
                        </div>
                    </div>

                    <div class="form-group row mt-2">
                        <label for="IdCurso" class="col-sm-2 col-form-label" hidden>ID Curso: </label>
                        <div class="col-sm-10">
                            <input type="number" class="form-control" id="IdActividad" hidden disabled>
                        </div>
                    </div>
                    
                    <button type="submit" class="btn btn-primary"><i class="fa-solid fa-floppy-disk"></i> Guardar</button>
                </form>
            </div>
        </div>
    </div>
    

</template>
<style scoped>
*{
    box-sizing: border-box;
}

.body-contenido{
    display: flex;
    align-items: flex-start;
    justify-content: center;
    background-color: white;
    min-height: calc(100vh - 100px);
    max-width: 100vw;
    margin: 100px 0 0 0;
}

.window-background{
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

.window-container{
    position: relative;
    background-color: #fff;
    width: 600px;
    height: auto;
    padding: 1.5rem;
    border-radius: 8px;
    animation-name: modal;
    animation-duration: .5s;
    box-shadow: 0 5px 15px -5px rgba(0, 0, 0, .4);
    z-index: 10;
}

@keyframes modal {
    from{
        transform: translateY(50vh);
    }

    to{
        transform: translateY(0);
    }
}

.close{
    transition: transform 1s cubic-bezier(0, -0.42, 1, -0.41);
    transform: translateY(60vh);
}

.close-button{
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

.icon-x{
    fill: rgb(54, 54, 54);
}

textarea {
  resize: none;
}
</style>
