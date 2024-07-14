<template>
    <div class="container-md">
        <h2>Registrar usuario</h2>  
        <fieldset>
            <form action="" class="" id="Formulario" @submit.prevent="submit">
                <input type="hidden" id="txtIdUsuario" class="form-control" disabled v-model="form.IdUsuario">
                <label for="txtUsuario" class="form-label">Usuario: </label>
                <input type="text" v-model="form.Usuario" name="txtUsuario" id="txtUsuario" placeholder="Ingresar usuario..." class="form-control">
                <br>

                <label for="txtClave">Contraseña: </label>
                <input type="password" v-model="form.Clave" name="txtPassword" id="txtPassword" placeholder="Ingresar clave..." class="form-control">
                <br>

                <label for="cbTipo">Tipo: </label>
                <select v-model="form.Tipo" name="cbTipo" id="cbTipo" class="form-select">
                    <option value="null">-- Seleccionar --</option>
                    <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                    <option value="TUTOR">TUTOR</option>
                    <option value="ESTUDIANTE">ESTUDIANTE</option>
                </select>
                <br>

                <div class="d-grid gap-2 d-md-block">
                    <input type="submit" value="Enviar" class="btn btn-primary boton">
                    &nbsp;
                    <input type="button" value="Limpiar" class="btn btn-secondary boton limpiar" v-on:click="limpiar">
                </div>
            </form>
        </fieldset>
    </div>
</template>

<script >

import { useRoute } from 'vue-router';
import axios, { Axios } from 'axios';

function limpiar(){
    const formulario = document.getElementById("Formulario")
    formulario.reset();
}
 export default{
    mounted(){
        this.form.IdUsuario = this.$route.params.id || -1;
        if(this.form.IdUsuario > -1){
            this.getUsuario();
        }
    },
    data(){
        return{
            form:{
                IdUsuario:'',
                Usuario:'',
                Clave:'',
                Tipo:''
            }
        }
    },
    methods:{
        submit:function(){

        },
        getUsuario(){
            //Metodo para obtener un estudiante enviado de la tabla 
            axios.get("http://localhost/sistema/api/usuarios/edit/"+this.form.IdUsuario).then(
                res=>{
                    this.form.IdUsuario = res.data.IdUsuario;
                    this.form.Usuario = res.data.Usuario;
                    this.form.Clave = res.data.Clave;
                    this.form.Tipo = res.data.Tipo;
                }
            );
        },
        actualizar(){
            var  usuario = {IdUsuario:this.form.IdUsuario.trim(),Usuario:this.form.Usuario.trim(),
                 Clave:this.form.Clave.trim(), Tipo:this.form.Tipo.trim()};
        }
    }
 }
</script>

<style scoped>
    
    @media (min-width: 720px) {
        form{
            max-width: 720px;
            margin-left: 20%;
            margin-right: 20%;
        }
    }
    .boton{
        padding: 5px 20px;
    }

</style>