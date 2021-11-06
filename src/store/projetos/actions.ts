import { ActionContext } from 'vuex';
import http from '@/http'

import { State } from '@/store';

import { TipoAcoes } from '../tipos-acoes';
import IProjeto from '@/interfaces/IProjeto';
import { TipoMutacoes } from '../tipos-mutacoes';

export interface ActionsDeProjetos {
    [TipoAcoes.LISTAR_PROJETOS](
        { commit }: ActionContext<State, State>
    ): void;
    [TipoAcoes.ADICIONA_PROJETO](
        { commit }: ActionContext<State, State>,
        nome: string,
    ): void;
    [TipoAcoes.ATUALIZA_PROJETO](
        { commit }: ActionContext<State, State>,
        projeto: IProjeto
    ): void;
    [TipoAcoes.REMOVE_PROJETO](
        { commit }: ActionContext<State, State>,
        id: number,
    ): void;
}

export const actions: ActionsDeProjetos = {
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
};