import { TokensDesign } from '../configuracao/esquema';

export interface PaletaPrimariaTema {
  readonly destaque: string;
  readonly destaqueHover: string;
  readonly contorno: string;
}

export interface PaletaNeutraTema {
  readonly superficie: string;
  readonly contraste: string;
  readonly apoio: string;
}

export interface PaletaFeedbackTema {
  readonly sucesso: string;
  readonly atencao: string;
  readonly erro: string;
}

export interface TipografiaTema {
  readonly familiaPrincipal: string;
  readonly pesos: {
    readonly regular: number;
    readonly seminegrito: number;
    readonly negrito: number;
  };
  readonly tamanhos: {
    readonly titulo: string;
    readonly subtitulo: string;
    readonly corpo: string;
    readonly legenda: string;
  };
  readonly alturasLinha: {
    readonly titulo: number;
    readonly corpo: number;
  };
}

export interface EscalaEspacamentoTema {
  readonly xs: string;
  readonly sm: string;
  readonly md: string;
}

export interface EscalaConfortavelTema {
  readonly lg: string;
  readonly xl: string;
  readonly xxl: string;
}

export interface GradeTema {
  readonly colunaBase: string;
  readonly larguraMinimaAcao: string;
}

export interface TemaStyledComponentsBase {
  readonly cores: {
    readonly primarias: PaletaPrimariaTema;
    readonly neutras: PaletaNeutraTema;
    readonly feedback: PaletaFeedbackTema;
  };
  readonly tipografia: TipografiaTema;
  readonly espacamentos: {
    readonly compacto: EscalaEspacamentoTema;
    readonly confortavel: EscalaConfortavelTema;
    readonly grade: GradeTema;
  };
}

/**
 * Converte o arquivo de tokens validado no esquema em um tema pronto para `styled-components`.
 */
export function montarTemaBase(tokens: TokensDesign): TemaStyledComponentsBase {
  return {
    cores: {
      primarias: {
        destaque: tokens.cores.primarias.destaque,
        destaqueHover: tokens.cores.primarias['destaque-hover'],
        contorno: tokens.cores.primarias.contorno,
      },
      neutras: {
        superficie: tokens.cores.neutras.superficie,
        contraste: tokens.cores.neutras.contraste,
        apoio: tokens.cores.neutras.apoio,
      },
      feedback: {
        sucesso: tokens.cores.feedback.sucesso,
        atencao: tokens.cores.feedback.atencao,
        erro: tokens.cores.feedback.erro,
      },
    },
    tipografia: {
      familiaPrincipal: tokens.tipografia['familia-principal'],
      pesos: {
        regular: tokens.tipografia.pesos.regular,
        seminegrito: tokens.tipografia.pesos.seminegrito,
        negrito: tokens.tipografia.pesos.negrito,
      },
      tamanhos: {
        titulo: tokens.tipografia.tamanhos.titulo,
        subtitulo: tokens.tipografia.tamanhos.subtitulo,
        corpo: tokens.tipografia.tamanhos.corpo,
        legenda: tokens.tipografia.tamanhos.legenda,
      },
      alturasLinha: {
        titulo: tokens.tipografia['alturas-linha'].titulo,
        corpo: tokens.tipografia['alturas-linha'].corpo,
      },
    },
    espacamentos: {
      compacto: {
        xs: tokens.espacamentos.compacto.xs,
        sm: tokens.espacamentos.compacto.sm,
        md: tokens.espacamentos.compacto.md,
      },
      confortavel: {
        lg: tokens.espacamentos.confortavel.lg,
        xl: tokens.espacamentos.confortavel.xl,
        xxl: tokens.espacamentos.confortavel.xxl,
      },
      grade: {
        colunaBase: tokens.espacamentos.grade['coluna-base'],
        larguraMinimaAcao: tokens.espacamentos.grade['largura-minima-acao'],
      },
    },
  };
}
