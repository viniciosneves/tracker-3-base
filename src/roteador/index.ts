import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Tarefas from '@/views/Tarefas.vue'
import Projetos from '@/views/Projetos.vue'
import Formulario from '@/views/projetos/Formulario.vue'
import Lista from '@/views/projetos/Lista.vue'

const rotas: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Tarefas',
    component: Tarefas
  },
  {
    path: '/projetos',
    name: 'Projetos',
    component: Projetos,
    children: [
      {
        path: '',
        name: 'Projetos',
        component: Lista
      },
      {
        path: 'novo',
        component: Formulario
      },
      {
        path: ':id',
        component: Formulario
      }
    ]
  }
]

const roteador = createRouter({
  history: createWebHashHistory(),
  routes: rotas
})

export default roteador
