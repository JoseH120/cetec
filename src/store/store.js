import router from "@/router";
import { createStore } from "vuex";
const store = createStore({
  state: {
    isLoggedIn: false,
  },

  getters: {
    loginState: (state) => {
      return state.isLoggedIn;
    },
  },
  mutations: {
    login(state) {
      state.isLoggedIn = true;
      if (router.currentRoute.name != "Home") {
        router.push("/");
      }
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("expires");
      localStorage.removeItem("idusuario");
      localStorage.removeItem("usuario");
      localStorage.removeItem("tipo");
      router.push({ name: "Signin" });
    },
  },

  actions: {
    login({ commit }, expires_in) {
      setTimeout(() => {
        commit("logout");
      }, expires_in);
      commit("login");
    },
    logout({ commit }) {
      commit("logout");
    },
  },
});

export default store;
