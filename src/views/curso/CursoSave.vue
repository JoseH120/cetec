<script setup>
    function limpiar(){
        const formulario = document.getElementById("Formulario")
        formulario.reset();
    }
</script>

<template>
    <div class="container">
        <h2>Registrar curso</h2>
        <form action="" id="Formulario">
            <input type="hidden" id="txtIdCurso" class="form-control" disabled>
            <label for="txtNombre" class="form-label">Nombre del curso: </label>
            <input type="text" id="txtNombre" autofocus placeholder="Escribir . . ." class="form-control">
            
            <br>
            <label for="taDescripcion" class="form-label">Descripción del curso: </label>    
            <textarea name="" id="taDescripcion" cols="12" rows="5" placeholder="Escribir . . ." class="form-control"></textarea>
            
            <label for="txtGrupo" class="form-label">Grupo: </label>
            <input type="text" id="txtGrupo" placeholder="Escribir . . ." class="form-control">

            <label for="cbTutor" class="form-label">Tutor:</label>
            <select name="" id="cbTutor" class="form-select">
                <option value="null">-- Seleccionar --</option>
                <option value="1">Jose perez</option>
                <option value="1">Jose perez</option>
                <option value="1">Jose perez</option>
            </select>
            <br>
            <div class="d-grid gap-2 d-md-block">
                <input type="submit" value="Guardar" class="btn btn-success">
                <input type="button" value="Limpiar" class="btn btn-secondary" v-on:click="limpiar">
            </div>
            
        </form>
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
    textarea{
        resize: none;
    }
</style>