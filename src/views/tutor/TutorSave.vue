<script setup>
    function limpiar(){
        const formulario = document.getElementById("Formulario")
        formulario.reset();
    }
</script>

<template>
    <div class="container">
        <h2>Guardar Tutor</h2>
        <br>
        <fieldset>
            <form action="" class="row g-3" id="Formulario">
                <div class="col-md-12">
                    <input type="hidden" id="txtIdTutor" class="form-control" disabled>
                </div>
                <div class="col-md-6">
                    <label for="txtNombre" class="form-label">Nombres: </label>
                    <input type="text" class="form-control" id="txtNombre" placeholder="Escribir . . ." autofocus>
                </div>
                <div class="col-md-6">
                    <label for="txtApellido" class="form-label">Apellidos: </label>
                    <input type="text" class="form-control" id="txtApellido" placeholder="Escribir . . .">
                </div>
                <div class="col-md-6">
                    <label for="txtEmail" class="form-label">Correo: </label>
                <input type="email" class="form-control" id="txtEmail" placeholder="Ejemplo@correo.com">
                <div class="col-md-6">
                    <label for="txtContacto" class="form-label">Telefono celular: </label>
                    <input type="number" class="form-control" id="txtContacto" placeholder="xxxxxxxx">
                </div>
            </div>
            <div class="col-md-3">
                <label for="txtIdUsuario" class="form-label">Usuario:</label>
                <select id="txtIdUsuario" class="form-select">
                <option value="null" selected>-- Seleccionar --</option>
                <option value="1">usuario 1</option>
                <option value="2">usuario 2</option>
                <option value="3">usuario 3</option>
                </select>
            </div>
            
            
            <div class="col-12">
                <input type="submit" class="btn btn-success boton" value="Guardar">
                <input type="button" class="btn btn-secondary boton" value="Limpiar" v-on:click="limpiar">
            </div>
            </form>
        </fieldset>
    </div>
</template>

<style scoped>
    @media (min-width: 720px) {
        form{
            max-width: 720px;
            margin-left: 20%;
            margin-right: 20%;
        }
    }
</style>