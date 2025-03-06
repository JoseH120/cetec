<template>
  <div class="container">
    <div class="row">
      <div
        class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 mt-5 pt-3 pb-3 bg-white from-wrapper"
      >
        <div class="container">
          <h3>Iniciar Sesion</h3>
          <hr />
          <form @submit.prevent="signin" action="/" method="post">
            <div class="form-group">
              <label for="email">Correo Electronico</label>
              <input
                type="text"
                name="email"
                id="email"
                class="form-control"
                v-model="state.email"
              />
            </div>
            <div class="form-group">
              <label for="clave">Contraseña</label>
              <input
                type="password"
                name="clave"
                id="clave"
                class="form-control"
                v-model="state.clave"
                autocomplete="off"
              />
            </div>

            <!-- Div que emite alerta -->
            <Alert
              v-if="state.msg"
              :msg="state.msg"
              :classAlert="state.classAlert"
            ></Alert>

            <div class="row">
              <div class="col-12 col-sm-8">
                <button type="submit" class="btn btn-primary">
                  Iniciar sesion
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Alert from "/src/components/Alert.vue";
import store from "/src/store/store.js";
import { reactive, inject } from "vue";
const axiosInstance = inject("axiosInstance");
const state = reactive({
  classAlert: null,
  msg: null,
  token: "",
  expires_in: null,
  clave: "",
  email: "",
  id: "",
});

const signin = () => {
  const form = new FormData();
  const auth = {
    username: import.meta.env.VITE_APP_CLIENT_ID,
    password: import.meta.env.VITE_APP_CLIENT_SECRET,
  };
  form.append("username", state.email);
  form.append("password", state.clave);
  form.append("grant_type", "password");
  axiosInstance
    .post("/login", form, { auth })
    .then((res) => {
      state.msg = "You have been succesfully logged in";
      state.classAlert = "success";
      state.email = "";
      state.clave = "";
      state.token = res.data.access_token;
      state.expires_in = res.data.expires_in;
      state.id = res.data.id;
      const expiresMs = state.expires_in * 1000;
      const now = new Date();
      const expireDate = new Date(now.getTime() + expiresMs);
      localStorage.setItem("token", state.token);
      localStorage.setItem("expires", expireDate);
      localStorage.setItem("idusuario", res.data.idusuario);
      localStorage.setItem("usuario", res.data.usuario);
      localStorage.setItem("tipo", res.data.tipo);
      if (res.data.tipo == "TUTOR") {
        localStorage.setItem("idtutor", res.data.idtutor);
      } else if (res.data.tipo == "ESTUDIANTE") {
        localStorage.setItem("idestudiante", res.data.idestudiante);
      }
      store.dispatch("login", expiresMs);
    })
    .catch((err) => {
      console.log(err.response);
      state.msg = err.response.data.error_description;
      state.classAlert = "danger";
    });
};
</script>
