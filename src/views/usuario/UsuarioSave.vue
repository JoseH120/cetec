<template>
    <div class="container-md">
        <h2>Registrar usuario</h2>  
        <fieldset>
            <form id="Formulario" v-on:submit="guardarUsuario()">
                <label for="txtIdUsuario" class="form-label" id="lblIdUduario"hidden>Id Usuario: </label>
                <input type="hidden" id="txtIdUsuario" class="form-control" disabled v-model="form.IdUsuario">

                <label for="txtUsuario" class="form-label">Usuario: </label>
                <input type="text" v-model="form.Usuario" name="txtUsuario" id="txtUsuario" placeholder="Ingresar usuario..." class="form-control">
                <br>

                <label for="txtClave">Contraseña: </label>
                <input type="password" v-model="form.Clave" name="txtPassword" id="txtPassword" placeholder="Ingresar clave..." class="form-control" autocomplete="off">
                <br>

                <label for="cbTipo">Tipo: </label>
                <select v-model="form.Tipo" name="cbTipo" id="cbTipo" class="form-select">
                    <option value="null" >-- Seleccionar --</option>
                    <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                    <option value="TUTOR">TUTOR</option>
                    <option value="ESTUDIANTE">ESTUDIANTE</option>
                </select>
                <br>

                <div class="d-grid gap-2 d-md-block">
                    <button class="btn btn-primary boton ">
                        <i class="fa-solid fa-floppy-disk"></i> Enviar
                    </button>
                    &nbsp;
                    <input type="button" value="Limpiar" class="btn btn-secondary boton limpiar" v-on:click="limpiar()">
                </div>
            </form>
        </fieldset>
    </div>
</template>

<script>

import axios from 'axios';
import { mostrarAlerta, enviarSolicitud } from '@/funciones';

 export default{
    data(){
        return{
            case: '',
            form:{
                IdUsuario:0,
                Usuario:'',
                Clave:'',
                Tipo:'null'
            },
            cargando: false
        }
    },
    mounted(){
        this.form.IdUsuario = this.$route.params.id || -1;
        this.case = this.$route.params.case || 0;
        if(this.form.IdUsuario == -1){
            //Insertar
            console.log('quiero Insertar');
        }
        else{
            if(this.case == 1){
                //ver
                console.log('quiero ver');
                this.getUsuario();
                this.bloquearInputs(1);
            }
            else{
                //editar
                console.log('quiero editar');
                this.getUsuario();
                this.bloquearInputs(2);
            }
        }
    },
    methods:{
        guardarUsuario(){
            event.preventDefault();
            //guardar
            if(this.form.IdUsuario == -1){
                //Insertar
                if(this.form.Usuario.trim()=== '')
                    mostrarAlerta('Ingrese un usuario', 'warning', 'txtUsuario');
                else if(this.form.Clave.trim() === '')
                    mostrarAlerta('Ingrese una contraseña', 'warning', 'txtPassword');
                else if((this.form.Clave.length <= 10))
                    mostrarAlerta('La contraseña debe ser mayor a 10 catacteres', 'warning')
                else if((this.form.Clave.length >= 255))
                    mostrarAlerta('La contraseña debe ser menor a 255 catacteres', 'warning')
                else if(this.form.Tipo.trim() =='null')
                    mostrarAlerta('Seleccione un tipo de usuario', 'warning', 'cbTipo');
                else{
                    let parametros = {
                        Usuario:this.form.Usuario.trim(), 
                        Clave:this.form.Clave.trim(), 
                        Tipo:this.form.Tipo.trim()
                    };
                    enviarSolicitud('POST', parametros, 'http://localhost/sistema/api/usuarios/create', 'Usuario registrado', '/listar_usuarios');
                    
                }
            }
            else{
                //Actualizar
                if(this.form.Usuario.trim()=== '')
                    mostrarAlerta('Ingrese un usuario', 'warning', 'txtUsuario');
                else if(this.form.Tipo.trim() =='null')
                    mostrarAlerta('Seleccione un tipo de usuario', 'warning', 'cbTipo');
                else{
                    let parametros = {
                        Usuario:this.form.Usuario.trim(), 
                        Tipo:this.form.Tipo.trim()
                    };
                    enviarSolicitud('PUT', parametros, 'http://localhost/sistema/api/usuarios/update/'+this.form.IdUsuario, 'Usuario actualizado', '/listar_usuarios');
                }
            }
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
            ).catch(function(error){
                console.log(error);
            });
        },
        limpiar(){
            const formulario = document.getElementById("Formulario")
            formulario.reset();
        },
        bloquearInputs(caso){
            if(caso == 1){
                let lblIdUduario = document.getElementById('lblIdUduario');
                lblIdUduario.hidden = false;

                let txtIdUsuario = document.getElementById('txtIdUsuario');
                txtIdUsuario.disabled = true;
                txtIdUsuario.type = 'text';

                let txtUsuario = document.getElementById('txtUsuario');
                txtUsuario.disabled = true;

                let txtPassword = document.getElementById('txtPassword');
                txtPassword.disabled = true;

                let cbTipo = document.getElementById('cbTipo');
                cbTipo.disabled = true;
            }
            if(caso == 2){
                let txtUsuario = document.getElementById('txtUsuario');
                txtUsuario.disabled = false;

                let txtPassword = document.getElementById('txtPassword');
                txtPassword.disabled = true;

                let cbTipo = document.getElementById('cbTipo');
                cbTipo.disabled = false;
            }
            
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