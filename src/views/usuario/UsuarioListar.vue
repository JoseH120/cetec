<style scoped>
    
    @media (min-width: 720px) {
        
    }
</style>

<template>
    <div class = "Container">
        <h2>Usuarios listar</h2>
        <Router-link class="btn btn-success color-with" to="/guardar_usuario">Agregar</Router-link>
        <div class="row">
            <div class="col-lg-8 offset-lg-2">
                <div class="table-responsive">
                    <table class="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Usuario</th>
                                <th>Tipo de usuario</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody class="table-group-divider" id="contenido">
                            <tr v-if="this.cargando">
                                <th colspan="5"><h3>Cargando . . . </h3></th>
                            </tr>
                            <tr v-else v-for="uss, i in this.usuarios" :key="uss.IdUsuario">
                                <td v-text="(uss.IdUsuario)"></td>
                                <td v-text="(uss.Usuario)"></td>
                                <td v-text="(uss.Tipo)"></td>
                                <td>
                                    <RouterLink :to="{path:'guardar_usuario/'+ uss.IdUsuario+'/1'}"  class="btn btn-info">
                                        <i class="fa-solid fa-eye"></i>
                                    </RouterLink>
                                    &nbsp;
                                    <RouterLink :to="{path:'guardar_usuario/'+uss.IdUsuario+'/2'}"  class="btn btn-warning">
                                        <i class="fa-solid fa-edit"></i>
                                    </RouterLink>
                                    &nbsp;
                                    <button class="btn btn-danger" v-on:click="$event => this.eliminar(uss.IdUsuario, uss.Usuario)">
                                        <i class="fa-solid fa-trash-can"></i> 
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

<script>
import { Confirmar, mostrarAlerta } from '@/funciones';
import axios from 'axios';
export default{
    data(){
        return{
            usuarios:null,
            cargando: false
        }
    },
    mounted(){
        this.getUsuarios();
    },
    methods:{
        getUsuarios(){
            let vue = this;
            this.cargando = true; 

            axios.get('http://localhost/sistema/api/usuarios').then(
                res => {
                    vue.usuarios = res.data;
                    vue.cargando = false;
                }
            ).catch(function(error){
                console.log(error);
            });
        },
        eliminar(id, usuario){
            Confirmar('http://localhost/sistema/api/usuarios/delete/', id, 'Eliminar registro', 'Realmente desea eliminar a '+usuario+' ?', '/listar_usuarios');
            this.cargando = false;
        }
    }
}
</script>
