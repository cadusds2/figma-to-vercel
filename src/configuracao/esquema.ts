import { z } from 'zod';

const mensagemObrigatorio = (campo: string) => `Campo obrigatório ausente: ${campo}.`;

const esquemaResumoProjeto = z.object({
  identificador: z
    .string({ required_error: mensagemObrigatorio('projeto.identificador'), invalid_type_error: 'O identificador do projeto deve ser um texto.' })
    .min(1, 'O identificador do projeto não pode estar vazio.'),
  nome: z
    .string({ required_error: mensagemObrigatorio('projeto.nome'), invalid_type_error: 'O nome do projeto deve ser um texto.' })
    .min(1, 'O nome do projeto não pode estar vazio.'),
  descricao: z.string({ invalid_type_error: 'A descrição do projeto deve ser um texto.' }).optional(),
  etiquetas: z
    .array(z.string({ invalid_type_error: 'Cada etiqueta deve ser um texto.' }).min(1, 'Uma etiqueta não pode ser vazia.'))
    .optional(),
});

const esquemaFigma = z.object({
  arquivoId: z
    .string({ required_error: mensagemObrigatorio('figma.arquivoId'), invalid_type_error: 'O identificador do arquivo Figma deve ser um texto.' })
    .min(1, 'O identificador do arquivo Figma não pode estar vazio.'),
  tokenLeitura: z
    .string({ required_error: mensagemObrigatorio('figma.tokenLeitura'), invalid_type_error: 'O token de leitura deve ser um texto.' })
    .min(1, 'O token de leitura do Figma não pode estar vazio.'),
  bibliotecaComponentes: z
    .string({ invalid_type_error: 'A biblioteca de componentes deve ser um texto.' })
    .optional(),
  tokensDesign: z
    .array(z.string({ invalid_type_error: 'Cada token de design deve ser um texto.' }).min(1, 'Tokens de design não podem ser vazios.'))
    .optional(),
});

const esquemaPreferencias = z
  .object({
    geracao: z
      .object({
        estrategiaComponentes: z
          .enum(['isolados', 'agrupados'], {
            invalid_type_error: 'A estratégia de componentes deve ser "isolados" ou "agrupados".',
          })
          .optional(),
        prefixoComponentes: z
          .string({ invalid_type_error: 'O prefixo de componentes deve ser um texto.' })
          .min(1, 'O prefixo de componentes não pode estar vazio.')
          .optional(),
        ignorarPaginas: z
          .array(z.string({ invalid_type_error: 'Cada página ignorada deve ser um texto.' }).min(1, 'Os nomes das páginas ignoradas não podem ser vazios.'))
          .optional(),
      })
      .optional(),
  })
  .optional();

const esquemaDeployVercel = z.object({
  projeto: z
    .string({ required_error: mensagemObrigatorio('deploy.vercel.projeto'), invalid_type_error: 'O nome do projeto na Vercel deve ser um texto.' })
    .min(1, 'O nome do projeto na Vercel não pode estar vazio.'),
  ambiente: z
    .string({ required_error: mensagemObrigatorio('deploy.vercel.ambiente'), invalid_type_error: 'O ambiente da Vercel deve ser um texto.' })
    .min(1, 'O ambiente da Vercel não pode estar vazio.'),
  variaveis: z
    .record(
      z
        .string({ invalid_type_error: 'As chaves das variáveis de ambiente devem ser textos.' })
        .min(1, 'O nome da variável de ambiente não pode ser vazio.'),
      z.string({ invalid_type_error: 'O valor da variável de ambiente deve ser um texto.' })
    )
    .optional(),
});

const esquemaDeploy = z.object({
  vercel: esquemaDeployVercel,
  comentarios: z
    .string({ invalid_type_error: 'O campo deploy.comentarios deve ser um texto.' })
    .optional(),
});

export const esquemaConfiguracaoProjeto = z.object({
  projeto: esquemaResumoProjeto,
  figma: esquemaFigma,
  preferencias: esquemaPreferencias,
  deploy: esquemaDeploy,
});

export type ConfiguracaoProjeto = z.infer<typeof esquemaConfiguracaoProjeto>;
export type ResumoProjetoConfigurado = ConfiguracaoProjeto['projeto'];

const esquemaCoresPrimarias = z.object({
  destaque: z
    .string({ invalid_type_error: 'O tom primário de destaque deve ser um texto.' })
    .min(1, 'O tom primário de destaque não pode ser vazio.'),
  'destaque-hover': z
    .string({ invalid_type_error: 'O tom primário para hover deve ser um texto.' })
    .min(1, 'O tom primário para hover não pode ser vazio.'),
  contorno: z
    .string({ invalid_type_error: 'O tom de contorno primário deve ser um texto.' })
    .min(1, 'O tom de contorno primário não pode ser vazio.'),
});

const esquemaCoresNeutras = z.object({
  superficie: z
    .string({ invalid_type_error: 'O tom neutro de superfície deve ser um texto.' })
    .min(1, 'O tom neutro de superfície não pode ser vazio.'),
  contraste: z
    .string({ invalid_type_error: 'O tom neutro de contraste deve ser um texto.' })
    .min(1, 'O tom neutro de contraste não pode ser vazio.'),
  apoio: z
    .string({ invalid_type_error: 'O tom neutro de apoio deve ser um texto.' })
    .min(1, 'O tom neutro de apoio não pode ser vazio.'),
});

const esquemaCoresFeedback = z.object({
  sucesso: z
    .string({ invalid_type_error: 'O tom de sucesso deve ser um texto.' })
    .min(1, 'O tom de sucesso não pode ser vazio.'),
  atencao: z
    .string({ invalid_type_error: 'O tom de atenção deve ser um texto.' })
    .min(1, 'O tom de atenção não pode ser vazio.'),
  erro: z
    .string({ invalid_type_error: 'O tom de erro deve ser um texto.' })
    .min(1, 'O tom de erro não pode ser vazio.'),
});

const esquemaTipografia = z.object({
  'familia-principal': z
    .string({ invalid_type_error: 'A família tipográfica principal deve ser um texto.' })
    .min(1, 'A família tipográfica principal não pode ser vazia.'),
  pesos: z.object({
    regular: z
      .number({ invalid_type_error: 'O peso tipográfico regular deve ser numérico.' })
      .int('O peso tipográfico regular deve ser inteiro.'),
    seminegrito: z
      .number({ invalid_type_error: 'O peso tipográfico seminegrito deve ser numérico.' })
      .int('O peso tipográfico seminegrito deve ser inteiro.'),
    negrito: z
      .number({ invalid_type_error: 'O peso tipográfico negrito deve ser numérico.' })
      .int('O peso tipográfico negrito deve ser inteiro.'),
  }),
  tamanhos: z.object({
    titulo: z
      .string({ invalid_type_error: 'O tamanho tipográfico de título deve ser um texto.' })
      .min(1, 'O tamanho tipográfico de título não pode ser vazio.'),
    subtitulo: z
      .string({ invalid_type_error: 'O tamanho tipográfico de subtítulo deve ser um texto.' })
      .min(1, 'O tamanho tipográfico de subtítulo não pode ser vazio.'),
    corpo: z
      .string({ invalid_type_error: 'O tamanho tipográfico de corpo deve ser um texto.' })
      .min(1, 'O tamanho tipográfico de corpo não pode ser vazio.'),
    legenda: z
      .string({ invalid_type_error: 'O tamanho tipográfico de legenda deve ser um texto.' })
      .min(1, 'O tamanho tipográfico de legenda não pode ser vazio.'),
  }),
  'alturas-linha': z.object({
    titulo: z
      .number({ invalid_type_error: 'A altura de linha para títulos deve ser numérica.' })
      .positive('A altura de linha para títulos deve ser positiva.'),
    corpo: z
      .number({ invalid_type_error: 'A altura de linha para corpo deve ser numérica.' })
      .positive('A altura de linha para corpo deve ser positiva.'),
  }),
});

const esquemaEspacamentos = z.object({
  compacto: z.object({
    xs: z
      .string({ invalid_type_error: 'O espaçamento compacto xs deve ser um texto.' })
      .min(1, 'O espaçamento compacto xs não pode ser vazio.'),
    sm: z
      .string({ invalid_type_error: 'O espaçamento compacto sm deve ser um texto.' })
      .min(1, 'O espaçamento compacto sm não pode ser vazio.'),
    md: z
      .string({ invalid_type_error: 'O espaçamento compacto md deve ser um texto.' })
      .min(1, 'O espaçamento compacto md não pode ser vazio.'),
  }),
  confortavel: z.object({
    lg: z
      .string({ invalid_type_error: 'O espaçamento confortável lg deve ser um texto.' })
      .min(1, 'O espaçamento confortável lg não pode ser vazio.'),
    xl: z
      .string({ invalid_type_error: 'O espaçamento confortável xl deve ser um texto.' })
      .min(1, 'O espaçamento confortável xl não pode ser vazio.'),
    xxl: z
      .string({ invalid_type_error: 'O espaçamento confortável xxl deve ser um texto.' })
      .min(1, 'O espaçamento confortável xxl não pode ser vazio.'),
  }),
  grade: z.object({
    'coluna-base': z
      .string({ invalid_type_error: 'A coluna base da grade deve ser um texto.' })
      .min(1, 'A coluna base da grade não pode ser vazia.'),
    'largura-minima-acao': z
      .string({ invalid_type_error: 'A largura mínima de ação deve ser um texto.' })
      .min(1, 'A largura mínima de ação não pode ser vazia.'),
  }),
});

export const esquemaTokensDesign = z.object({
  cores: z.object({
    primarias: esquemaCoresPrimarias,
    neutras: esquemaCoresNeutras,
    feedback: esquemaCoresFeedback,
  }),
  tipografia: esquemaTipografia,
  espacamentos: esquemaEspacamentos,
});

export type TokensDesign = z.infer<typeof esquemaTokensDesign>;
