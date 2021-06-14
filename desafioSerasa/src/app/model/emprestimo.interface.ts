export interface Emprestimo {
  uid?: string;
  valor?: number;
  taxa?: number;
  numeroDeParcelas?: number;
  parcelasPagas?: number;
  valorTotal?: number;
  dataDaContratação?: number;
  parcelas?:{
    valorParcelas?:number,
    dataPagamento?: number,
    dataVencimento?: number,
    jurosAdicionais?: number
  }[];
  pendencia?: boolean;
}
