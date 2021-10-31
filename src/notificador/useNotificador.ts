import { TipoNotificacao } from "@/interfaces/INotificacao"
import { store } from "@/store";
import { NOTIFICAR } from "@/store/tipos-mutacoes";

type Notificador = { 
  notificar: (tipo: TipoNotificacao, mensagem: string, titulo?: string) => void
}

export default () : Notificador => {

  function notificar(tipo: TipoNotificacao, mensagem: string, titulo = 'Atenção'): void {
    store.commit(NOTIFICAR, {
      titulo,
      texto: mensagem,
      tipo: tipo
    });
  }
  return {
    notificar
  }
}