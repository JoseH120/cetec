import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import { api, guest } from "./pluggins/axios";
import VueSweetalert2 from "vue-sweetalert2";

import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// if you don't need the styles, do not connect
// import 'sweetalert2/dist/sweetalert2.min.css'

const app = createApp(App);

app.use(store);
app.use(router);
app.use(VueSweetalert2);
app.provide("api", { ...api });
app.provide("axiosInstance", { ...guest });

app.mount("#app");
import "bootstrap/dist/js/bootstrap.js";
