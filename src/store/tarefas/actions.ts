import { ActionContext } from 'vuex';
import http from '@/http'

import { State } from '@/store';

import { TipoAcoes } from '../tipos-acoes';
import ITarefa from '@/interfaces/ITarefa';
import { TipoMutacoes } from '../tipos-mutacoes';

export interface ActionsDeTarefas {
  [TipoAcoes.LISTAR_TAREFAS](
    { commit }: ActionContext<State, State>
  ): void;
  [TipoAcoes.ADICIONA_TAREFA](
    { commit }: ActionContext<State, State>,
    tarefa: ITarefa,
  ): void;
  [TipoAcoes.ATUALIZA_TAREFA](
    { commit }: ActionContext<State, State>,
    tarefa: ITarefa
  ): void;
}

export const actions: ActionsDeTarefas = {
  [TipoAcoes.LISTAR_TAREFAS]({ commit }) {
    http.get('tarefas')
      .then(resposta => commit(TipoMutacoes.DEFINIR_TAREFAS, resposta.data))
  },
  [TipoAcoes.ADICIONA_TAREFA]({ dispatch }, tarefa: ITarefa) {
    http.post('tarefas', tarefa).then(() => dispatch(TipoAcoes.LISTAR_TAREFAS))
  },
  [TipoAcoes.ATUALIZA_TAREFA]({ dispatch }, tarefa: ITarefa) {
    http.put(`tarefas/${tarefa.id}`, tarefa)
      .then(() => dispatch(TipoAcoes.LISTAR_TAREFAS))
  },
};