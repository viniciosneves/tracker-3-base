import { MutationTree } from 'vuex';
import { State } from '@/store';
import { TipoMutacoes } from '../tipos-mutacoes';
import IProjeto from '@/interfaces/IProjeto';

export type MutationsDeProjetos<S = State> = {
  [TipoMutacoes.DEFINIR_PROJETOS](state: S, projetos: IProjeto[]): void;
}

export const mutations: MutationTree<State> & MutationsDeProjetos = {
  [TipoMutacoes.DEFINIR_PROJETOS](state: State, projetos: IProjeto[]) {
    state.projetos = projetos;
  },
};