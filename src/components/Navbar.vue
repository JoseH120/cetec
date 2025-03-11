<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" :to="loggedIn ? '/' : '/signin'"
        >CETEC-ES</RouterLink
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul v-if="!loggedIn" class="navbar-nav me-auto mb-2 mb-lg-0">
          <Navlink path="/signin" text="Inicia sesion" />
        </ul>
        <!-- Nav Items if loggedin  -->
        <ul
          v-else-if="loggedIn && user.tipo == 'ADMINISTRADOR'"
          class="navbar-nav me-auto mb-2 mb-lg-0"
        >
          <Navlink path="/listar_usuarios" text="Usuarios" />
          <Navlink path="/listar_tutores" text="Tutores" />
          <Navlink path="/listar_estudiantes" text="Estudiantes" />
          <Navlink path="/listar_cursos" text="Cursos" />
          <Navlink path="/listar_solicitudes/" text="Solicitudes" />
        </ul>
        <!-- NAV PARA TUTORES -->
        <ul
          v-else-if="loggedIn && user.tipo == 'TUTOR'"
          class="navbar-nav me-auto mb-2 mb-lg-0"
        >
          <Navlink :path="`/my/index/${user.id}`" text="Principal" />
          <Navlink path="/listar_solicitudes/" text="Mis Solicitudes" />
        </ul>
        <!-- NAV PARA TUTORES -->
        <ul
          v-else-if="loggedIn && user.tipo == 'ESTUDIANTE'"
          class="navbar-nav me-auto mb-2 mb-lg-0"
        >
          <Navlink :path="`/my/index/${user.id}`" text="Principal" />
        </ul>
        <!-- Agregando nuevo elemento a la derecho -->
        <ul
          v-show="loggedIn"
          class="navbar-nav ms-auto mb-2 mb-lg-0 profile-menu"
        >
          <li class="nav-item dropdown">
            <a
              href="#"
              class="nav-link dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fas fa-user"></i>
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li @click="logout()">
                <a href="#" class="dropdown-item fas fa-sign-out-alt fa-fw"></a
                >Log Out
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import Navlink from "@/components/Navlink.vue";
import store from "@/store/store";
import { onUpdated, reactive } from "vue";

const props = defineProps({
  loggedIn: Boolean,
});

const user = reactive({
  idusuario: null,
  id: null,
  usuario: null,
  tipo: null,
});

const logout = () => {
  store.dispatch("logout");
};

const userInfo = () => {
  if (props.loggedIn) {
    user.idusuario = localStorage.getItem("idusuario");
    user.usuario = localStorage.getItem("usuario");
    user.tipo = localStorage.getItem("tipo");
    if (user.tipo != "ESTUDIANTE" && user.tipo != "TUTOR") {
      user.id == 0;
    } else if (user.tipo == "ESTUDIANTE") {
      user.id = localStorage.getItem("idestudiante");
    } else if (user.tipo == "TUTOR") {
      user.id = localStorage.getItem("idtutor");
    }
  } else {
    user.idusuario = null;
    user.usuario = null;
    user.tipo = null;
    user.id = null;
  }
};

onUpdated(() => {
  userInfo();
});

userInfo();
</script>

<style scoped>
.profile-menu .dropdown-menu {
  right: 0;
  left: unset;
}
.profile-menu .fa-fw {
  margin-right: 10px;
}

.toggle-change::after {
  border-top: 0;
  border-bottom: 0.3em solid;
}
</style>
