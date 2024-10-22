import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Signin from "../views/login/Signin.vue";
import UsuarioListar from "@/views/usuario/UsuarioListar.vue";
import UsuarioSave from "@/views/usuario/UsuarioSave.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/listar_usuarios",
      name: "UsuarioListar",
      component: UsuarioListar,
    },
    {
      path: "/guardar_usuario/:id?/:case?",
      name: "UsuarioSave",
      component: UsuarioSave,
    },
    {
      path: "/signin",
      name: "Signin",
      component: Signin,
    },
    {
      path: "/listar_tutores",
      name: "TutorListar",
      component: () => import("../views/tutor/TutorListar.vue"),
    },
    {
      path: "/guardar_tutor/:id?/:case?",
      name: "TutorSave",
      component: () => import("../views/tutor/TutorSave.vue"),
    },
    {
      path: "/listar_estudiantes",
      name: "EstudianteListar",
      component: () => import("../views/estudiante/EstudianteListar.vue"),
    },
    {
      path: "/guardar_estudiante/:id?/:case?",
      name: "EstudianteSave",
      component: () => import("../views/estudiante/EstudianteSave.vue"),
    },
    {
      path: "/listar_cursos",
      name: "CursosListar",
      component: () => import("../views/curso/CursosListar.vue"),
    },
    {
      path: "/guardar_curso/:id?/:case?",
      name: "CursoSave",
      component: () => import("../views/curso/CursoSave.vue"),
    },
    // MATRICULA ROUTING
    {
      path: "/matricula/:idCurso?",
      name: "Matricula",
      component: () => import("../views/matricula/Matricula.vue"),
    },
    {
      path: "/my/index/:id?",
      name: "Index",
      component: () => import("../views/my/Index.vue"),
    },
    {
      path: "/curso/:idCurso?",
      name: "Curso",
      component: () => import("../views/curso/Curso.vue"),
    },
    {
      path: "/guardar_actividad",
      name: "ActividadSave",
      component: () => import("../views/actividades/ActividadSave.vue"),
    },
  ],
});

export default router;
