import { TipoNotificacao } from "@/interfaces/INotificacao"
import { store } from "@/store";
import { NOTIFICAR } from "@/store/tipos-mutacoes";

export const notificacaoMixin = {
  methods: {
    notificar(tipo: TipoNotificacao,  mensagem: string, titulo = 'Atenção') : void {
      store.commit(NOTIFICAR, {
        titulo,
        texto: mensagem,
        tipo: tipo
      });
    }
  }
}