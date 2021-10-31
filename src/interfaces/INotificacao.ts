export enum TipoNotificacao {
  SUCESSO,
  ATENCAO,
  ERRO
}

export interface INotificacao {
  id:number
  titulo?: string
  texto: string
  tipo: TipoNotificacao
}

