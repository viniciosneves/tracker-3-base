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
  notificacoes: INotificacao[],
  requisicoes: string[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    projetos: [],
    tarefas: [],
    notificacoes: [],
    requisicoes: [],
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
    [TipoMutacoes.HTTP_START] (state, url) {
      state.requisicoes.push(url)
    },
    [TipoMutacoes.HTTP_FINISH] (state, url) {
      const index = state.requisicoes.indexOf(url)
      if (index > -1) {
        state.requisicoes.splice(index, 1)
      }
    }

  },
  actions: {
    ...actionsProjeto,
    ...actionsTarefas,
  },
  getters: {
    obterProjetoPorId: (state) => (id: number) => {
      return state.projetos.find(projeto => projeto.id === id)
    },
    loading: state => state.requisicoes.length > 0
  }
})

export function useStore(): Store<State> {
  return baseUseStore(key)
}