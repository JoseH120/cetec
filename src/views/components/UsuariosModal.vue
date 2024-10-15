<style scoped>
/*modal */
.modal-container{
    
    position: fixed;
    z-index: 100;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .Modal{
    width: 80%;
    height: 80%;
    background: #fff;
    position: relative;
    transition: transform 1s;
    transform: translateY(0%);
    border-radius: 10px;
    padding: 25px 5px;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .Modal-close{
    transform: translateY(-200%);
  }

  .Close{
    position: absolute;
    top: 5px;
    right: 5px;
    display: inline-block;
    width: 25px;
    height: 25px;
    background: #c44a4a;
    color: white;
    line-height: 25px;
    cursor: pointer;
    border-radius: 50%;
    text-align: center;
    }
    /*fin modal */

    .fade-enter,
    .fade-leave-to{
        opacity: 0;
    }

    .fade-enter-active,
    .fade-leave-to-active{
        transition: all 250ms ease-in-out;
    }
</style>
<template>
<div class="modal-container" id="modalContainer">
    <div class="Modal" id="Modal">
        <h2>Usuarios</h2>
        <p class="Close" @click="Cerrar()" id="Close">X</p>
        <div class="row">
            <div class="col-lg-8 offset-lg-2">
                <div class="table-responsive">
                    <table class="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>ID USUARIO</th>
                                <th>USUARIO</th>
                                <th>TIPO DE USUARIO</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(uss, i) in usuarios" :key="uss.IdUsuario" @dblclick="usuarioSeleccionado(uss.IdUsuario)">
                                <td>{{ uss.IdUsuario }}</td>
                                <td>{{ uss.Usuario }}</td>
                                <td>{{ uss.Tipo }}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import { onMounted, ref, defineEmits } from 'vue';
import axios from 'axios';

let props = defineProps({
    TipoUsuarios: String
});

const usuarios = ref(null);

const emit = defineEmits(['close', 'dblclickUsuario']);

const getUsuarios = (tipo) => {
    axios.get('http://localhost/sistema/api/usuarios/'+tipo).then(
        async res => { 
            usuarios.value = await res.data;
        }).catch(function(error){
                console.log(error);
        });
    }

const Cerrar = ()=> {
        emit("close");
    };

const usuarioSeleccionado = (usuario) =>{
        emit("dblclickUsuario", usuario);
    };

onMounted(()=>{
    switch(props.TipoUsuarios){
        case "ESTUDIANTE":
            getUsuarios('getUsuariosNoAsignadosEstudiante');
            break;
        case "ADMINISTRADOR":
            getUsuarios('getUsuariosNoAsignadosAdministrador');
            break;
        case "TUTOR":
            getUsuarios('getUsuariosNoAsignadosTutor');
            break;
        default:
            break;
    }
})
</script>
