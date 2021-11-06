import { MutationTree } from 'vuex';
import { State } from '@/store';
import { TipoMutacoes } from '../tipos-mutacoes';
import ITarefa from '@/interfaces/ITarefa';

export type MutationsDeTarefas<S = State> = {
  [TipoMutacoes.DEFINIR_TAREFAS](state: S, tarefas: ITarefa[]): void;
}

export const mutations: MutationTree<State> & MutationsDeTarefas = {
  [TipoMutacoes.DEFINIR_TAREFAS](state: State, tarefas: ITarefa[]) {
    state.tarefas = tarefas;
  },
};