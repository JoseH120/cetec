<style>
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
        <h2>Tutores</h2>
        <p class="Close" @click="Cerrar()" id="Close">X</p>
        <div class="row">
            <div class="col-lg-8 offset-lg-2">
                <div class="table-responsive">
                    <table class="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>ID TUTOR</th>
                                <th>NOMBRE</th>
                                <th>APELLIDO</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(tur, i) in tutores" :key="tur.IdTutor" @dblclick="tutorSeleccionado(tur.IdTutor)">
                                <td>{{ tur.IdTutor }}</td>
                                <td>{{ tur.Nombre }}</td>
                                <td>{{ tur.Apellido }}</td>
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
import {ref, defineEmits } from 'vue';
import axios from 'axios';

const tutores = ref(null);

const emit = defineEmits(['close', 'dblclickTutor']);

const getTutores = ()=>{
    axios.get('http://localhost/sistema/api/tutores').then(
        async res => {
            tutores.value = await res.data;
        })
        .catch(function(error){
            console.log(error);
        });
};

const Cerrar = ()=>{
            emit("close");
        };
        
const tutorSeleccionado = (tutor)=>{
            emit("dblclickTutor", tutor);
        };
getTutores();

</script>