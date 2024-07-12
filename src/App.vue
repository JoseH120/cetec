<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <Router-link class="navbar-brand" to="/">CETEC-ES</Router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Router-link class="nav-link active" aria-current="page" to="/">Inicio</Router-link>
              
            </li>
            <li class="nav-item">
              <Router-link class="nav-link" to="/listar_usuarios"> Usuarios</Router-link>
            </li>
            <li class="nav-item">
              <Router-link class="nav-link" to="/listar_cursos"> Cursos</Router-link>
            </li>
            <li class="nav-item">
              <Router-link class="nav-link" to="/listar_estudiantes"> Estudiantes</Router-link>
            </li>
            <li class="nav-item">
              <Router-link class="nav-link" to="/listar_tutores"> Tutores</Router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" aria-disabled="true">Acerca de</a>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Buscar" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Buscar</button>
          </form>
        </div>
      </div>
    </nav>
    <RouterView />
</template>

<style>

</style>

