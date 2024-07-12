import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UsuarioListar from '../views/usuario/UsuarioListar.vue'
import UsuarioSave from '../views/usuario/UsuarioSave.vue'
import CursoListar from '@/views/curso/CursoListar.vue'
import CursoSave from '@/views/curso/CursoSave.vue'
import EstudianteListar from '@/views/estudiante/EstudianteListar.vue'
import EstudianteSave from '@/views/estudiante/EstudianteSave.vue'
import TutorListar from '@/views/tutor/TutorListar.vue'
import TutorSave from '@/views/tutor/TutorSave.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/guardar_usuario/:id',
      name: 'UsuarioSave',
      component: UsuarioSave
    },
    {
      path: '/listar_usuarios',
      name: 'UsuarioListar',
      component: UsuarioListar
    },
    {
      path: '/listar_cursos',
      name: 'CursoListar',
      component: CursoListar
    },
    {
      path: '/guardar_curso/:id',
      name: 'CursoSave',
      component: CursoSave
    },
    {
      path: '/listar_estudiantes',
      name: 'EstudianteListar',
      component: EstudianteListar
    },
    {
      path: '/guardar_estudiante/:id',
      name: 'EstudianteSave',
      component: EstudianteSave
    },
    {
      path: '/listar_tutores',
      name: 'TutorListar',
      component: TutorListar
    },
    {
      path: '/guardar_tutor/:id',
      name: 'TutorSave',
      component: TutorSave
    }
  ]
})

export default router
