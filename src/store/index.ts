import { INotificacao } from '@/interfaces/INotificacao'
import IProjeto from '@/interfaces/IProjeto'
import ITarefa from '@/interfaces/ITarefa'
import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore, } from 'vuex'
import { TipoMutacoes } from './tipos-mutacoes'

import { actions as actionsProjeto } from './projetos/actions'
import { mutations as mutationsProjeto } from './projetos/mutations'

import { actions as actionsTarefas } from './tarefas/actions'
import { mutations as mutationsTarefas } from './tarefas/mutations'

export interface State {
  projetos: IProjeto[],
  tarefas: ITarefa[],
  notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    projetos: [],
    tarefas: [],
    notificacoes: [],
  },
  mutations: {
    ...mutationsProjeto,
    ...mutationsTarefas,
    [TipoMutacoes.NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime()
      state.notificacoes.push(novaNotificacao)
      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(n => n.id != novaNotificacao.id)
      }, 3000)
    },
  },
  actions: {
    ...actionsProjeto,
    ...actionsTarefas,
  },
  getters: {
    obterProjetoPorId: (state) => (id: number) => {
      return state.projetos.find(projeto => projeto.id === id)
    }
  }
})

export function useStore(): Store<State> {
  return baseUseStore(key)
}