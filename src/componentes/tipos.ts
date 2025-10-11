export type BibliotecaEstilizacao = 'styled-components';

export const BIBLIOTECA_ESTILIZACAO_PADRAO: BibliotecaEstilizacao = 'styled-components';

export interface EstadoComponenteBase {
  readonly nome: string;
  readonly descricao: string;
  readonly tokensRelacionados: readonly string[];
}

export interface RegraResponsividade {
  readonly condicao: string;
  readonly orientacao: string;
}

export interface ComponenteBase {
  readonly identificador: string;
  readonly nome: string;
  readonly descricao: string;
  readonly bibliotecaEstilizacao: BibliotecaEstilizacao;
  readonly tokensFundamentais: readonly string[];
  readonly estados: readonly EstadoComponenteBase[];
  readonly responsividade: readonly RegraResponsividade[];
}
