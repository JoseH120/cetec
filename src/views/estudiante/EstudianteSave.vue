<script setup>
    function limpiar(){
        const formulario = document.getElementById("Formulario")
        formulario.reset();
    }
</script>

<template>

<div class="container">
    <h2>Guardar estudiante</h2>
    <fieldset>
        <form class="row g-3" id="Formulario">
            <div class="col-md-12">
                <input type="hidden" id="txtIdEstudiante" class="form-control" disabled>
            </div>
            <div class="col-md-6">
                <label for="txtPrimerNombre" class="form-label">Primer Nombre: </label>
                <input type="text" class="form-control" id="txtPrimerNombre" placeholder="Escribir . . ." autofocus>
            </div>
            <div class="col-md-6">
                <label for="txtSegundoNombre" class="form-label">Segundo Nombre: </label>
                <input type="text" class="form-control" id="txtSegundoNombre" placeholder="Escribir . . .">
            </div>
            <div class="col-md-6">
                <label for="txtPrimerApellido" class="form-label">Primer Apellido: </label>
                <input type="text" class="form-control" id="txtPrimerApellido" placeholder="Escribir . . .">
            </div>
            <div class="col-md-6">
                <label for="txtSegundoApellido" class="form-label">Segundo Apellido: </label>
                <input type="text" class="form-control" id="txtSegundoApellido" placeholder="Escribir . . .">
            </div>
            
            <div class="col-3">
                <label for="txtDui" class="form-label">DUI: </label>
                <input type="text" class="form-control" id="txtDui" placeholder="Ejemplo: xxxxxxxx-x">
            </div>
            <div class="col-md-9">
                <label for="txtDireccion" class="form-label">Dirección: </label>
                <input type="text" class="form-control" id="txtDireccion" placeholder="Escribir . . .">
            </div>
            <div class="col-md-3">
                <label for="date" class="form-label">Fecha de Nacimiento: </label>
                <input type="date" class="form-control" id="date" >
            </div>
            <div class="col-md-9">
                <label for="txtResponsable" class="form-label">Nombre completo del responsable: </label>
                <input type="text" class="form-control" id="txtResponsable" placeholder="Escribir . . .">
            </div>
            <div class="col-md-6">
                <label for="txtEmail" class="form-label">Correo: </label>
                <input type="email" class="form-control" id="txtEmail" placeholder="Ejemplo@correo.com">
            </div>
            <div class="col-md-3">
                <label for="txtVacunaCovid" class="form-label">Vacuna COVID:</label>
                <select id="txtVacunaCovid" class="form-select">
                <option value="1" selected>SI</option>
                <option value="2">NO</option>
                </select>
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
    .boton{
        padding: 5px 20px;
        
    }
</style> 