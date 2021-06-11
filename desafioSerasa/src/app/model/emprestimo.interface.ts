export interface Emprestimo {
  uid?: string;
  valor?: number;
  taxa?: number;
  parcelas?: number;
  parcelasPagas?: number;
  valorParcela?: number;
  valorTotal?: number;
  dataDaContratação?: Date;
  parcelasJaPagas?:{
    valorParcelas?:number,
    dataPagamento?: Date,
    dataVencimento?: Date,
    jurosAdicionais?: number
  }[];
}
