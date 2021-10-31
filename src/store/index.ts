import { INotificacao } from '@/interfaces/INotificacao'
import IProjeto from '@/interfaces/IProjeto'
import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore, } from 'vuex'
import { TipoAcoes } from './tipos-acoes'
import { TipoMutacoes } from './tipos-mutacoes'

import http from '@/http'

interface State {
  projetos: IProjeto[],
  notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    projetos: [],
    notificacoes: [],
  },
  mutations: {
    [TipoMutacoes.DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
      state.projetos = projetos
    },
    [TipoMutacoes.NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime()
      state.notificacoes.push(novaNotificacao)
      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(n => n.id != novaNotificacao.id)
      }, 3000)
    },
  },
  actions: {
    [TipoAcoes.LISTAR_PROJETOS]({ commit }) {
      http.get('projetos')
        .then(resposta => commit(TipoMutacoes.DEFINIR_PROJETOS, resposta.data))
    },
    [TipoAcoes.ADICIONA_PROJETO]({ dispatch }, nome: string) {
      http.post('projetos', {
        nome
      }).then(() => dispatch(TipoAcoes.LISTAR_PROJETOS))
    },
    [TipoAcoes.ATUALIZA_PROJETO]({ dispatch }, projeto: IProjeto) {
      http.put(`projetos/${projeto.id}`, projeto)
        .then(() => dispatch(TipoAcoes.LISTAR_PROJETOS))
    },
    [TipoAcoes.REMOVE_PROJETO]({ dispatch }, id: number) {
      http.delete(`projetos/${id}`)
        .then(() => dispatch(TipoAcoes.LISTAR_PROJETOS))
    },
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