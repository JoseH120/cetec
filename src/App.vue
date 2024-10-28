<template>
  <Navbar :loggedIn="loggedIn"></Navbar>
  <RouterView></RouterView>

</template>

<script setup>
import { computed } from "vue";
import { useRouter, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const loggedIn = computed(() => {
  return store.getters.loginState;
});

const crear = () => {
  const expires = localStorage.getItem("expires");
  const token = localStorage.getItem("token");
  if (expires && token) {
    var expiresMs = new Date(expires);
    var now = new Date();
    now = now.getTime();
    expiresMs = expiresMs.getTime();
    if (now > expiresMs) {
      store.dispatch("logout");
    } else {
      store.dispatch("login", expiresMs - now);
    }
  } else {
    if (router.currentRoute.name != "Signin") {
      router.push({ name: "Signin" });
    }
  }
};

crear();
</script>

