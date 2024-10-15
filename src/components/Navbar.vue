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
        <ul v-else class="navbar-nav me-auto mb-2 mb-lg-0">
          <Navlink path="/" text="home" />
          <Navlink path="/listar_usuarios" text="Usuarios" />
          <Navlink path="/listar_tutores" text="Tutores" />
          <Navlink path="/listar_estudiantes" text="Estudiantes" />
          <Navlink path="/listar_cursos" text="Cursos" />
          <Navlink path="/matricula/1" text="matricula" />
          <Navlink path="/my/index/11" text="Principal" />
          <Navlink path="/about" text="About" />
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
              <li>
                <a href="#" class="dropdown-item fas fa-sliders-h fa-fw"></a
                >Account
              </li>
              <li>
                <a href="" class="dropdown-item fas fa-cog fa-fw"></a>Settings
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li>
                <a
                  href="#"
                  class="dropdown-item fas fa-sign-out-alt fa-fw"
                  @click="logout()"
                ></a
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
import Navlink from "@/components/Navlink2.vue";
import store from "@/store/store";
import { api } from "@/pluggins/axios";
import { onUpdated } from "vue";

const props = defineProps({
  loggedIn: Boolean,
});

const logout = () => {
  store.dispatch("logout");
};

onUpdated(() => {
  if (props.loggedIn) {
    const email = localStorage.getItem("email");
    api
      .post("/usuarios/obtener", { email: email })
      .then((respuesta) => {
        localStorage.setItem("IdUsuario", respuesta.data.IdUsuario);
      })
      .catch((error) => {
        console.log(error);
      });
  }
});
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
