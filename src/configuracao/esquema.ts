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
