<template>
    <div class="container-md">
        <h2>Registrar usuario</h2>  
        <fieldset>
            <form action="" class="" id="Formulario">
                <input type="hidden" id="txtIdUsuario" class="form-control" disabled>
                <label for="txtUsuario" class="form-label">Usuario: </label>
                <input type="text" name="txtUsuario" id="txtUsuario" placeholder="Ingresar usuario..." class="form-control">
                <br>

                <label for="txtClave">Contraseña: </label>
                <input type="password" name="txtPassword" id="txtPassword" placeholder="Ingresar clave..." class="form-control">
                <br>

                <label for="txtClave">Tipo: </label>
                <select name="cbTipo" id="cbTipo" class="form-select">
                    <option value="null">-- Seleccionar --</option>
                    <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                    <option value="TUTOR">TUTOR</option>
                    <option value="ESTUDIANTE">ESTUDIANTE</option>
                </select>
                <br>

                <div class="d-grid gap-2 d-md-block">
                    <input type="submit" value="Enviar" class="btn btn-primary boton">
                    <input type="button" value="Limpiar" class="btn btn-secondary boton limpiar" v-on:click="limpiar">
                </div>
            </form>
        </fieldset>
    </div>
</template>

<script setup>

function limpiar(){
    const formulario = document.getElementById("Formulario")
    formulario.reset();
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