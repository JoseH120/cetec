
<template>
    <div class = "Container">
        <h2>Usuarios listar</h2>
        &nbsp;
        <Router-link class="btn btn-success color-with" to="/guardar_usuario">Agregar</Router-link>
        <RouterView />
        <div class="row">
            <div class="col-lg-8 offset-lg2">
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
                                <td>botones

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
        }
    }
}
</script>
