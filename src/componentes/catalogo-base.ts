import { BIBLIOTECA_ESTILIZACAO_PADRAO, ComponenteBase } from './tipos';

const catalogoBaseComponentes = [
  {
    identificador: 'botao-primario',
    nome: 'Botão primário',
    descricao: 'Ação principal em formulários, fluxos críticos e chamadas diretas.',
    bibliotecaEstilizacao: BIBLIOTECA_ESTILIZACAO_PADRAO,
    tokensFundamentais: [
      'cores.primarias.destaque',
      'cores.primarias["destaque-hover"]',
      'cores.primarias.contorno',
      'cores.neutras.contraste',
      'cores.neutras.apoio',
      'tipografia["familia-principal"]',
      'tipografia.pesos.seminegrito',
      'tipografia.tamanhos.corpo',
      'espacamentos.confortavel.lg',
      'espacamentos.grade["largura-minima-acao"]',
    ],
    estados: [
      {
        nome: 'default',
        descricao: 'Plano de fundo no tom de destaque com texto em contraste máximo.',
        tokensRelacionados: ['cores.primarias.destaque', 'cores.neutras.contraste'],
      },
      {
        nome: 'hover',
        descricao: 'Escurece levemente o fundo mantendo tipografia e contraste.',
        tokensRelacionados: ['cores.primarias["destaque-hover"]', 'cores.neutras.contraste'],
      },
      {
        nome: 'press',
        descricao: 'Adiciona compressão visual reduzindo a opacidade do fundo.',
        tokensRelacionados: ['cores.primarias["destaque-hover"]'],
      },
      {
        nome: 'focus',
        descricao: 'Mantém o fundo principal e adiciona contorno visível para acessibilidade.',
        tokensRelacionados: ['cores.primarias.contorno'],
      },
      {
        nome: 'disabled',
        descricao: 'Reduz opacidade geral e bloqueia eventos de interação.',
        tokensRelacionados: ['cores.neutras.apoio'],
      },
    ],
    responsividade: [
      {
        condicao: '<768px',
        orientacao: 'Ocupação de 100% da largura disponível e preenchimento horizontal de 8px.',
      },
      {
        condicao: '>=768px',
        orientacao: 'Largura conforme conteúdo respeitando a largura mínima de ação de 48px.',
      },
    ],
  },
  {
    identificador: 'botao-secundario',
    nome: 'Botão secundário',
    descricao: 'Oferece ações complementares, utilizando destaque via contorno.',
    bibliotecaEstilizacao: BIBLIOTECA_ESTILIZACAO_PADRAO,
    tokensFundamentais: [
      'cores.neutras.superficie',
      'cores.primarias.contorno',
      'cores.neutras.contraste',
      'cores.neutras.apoio',
      'tipografia["familia-principal"]',
      'tipografia.pesos.seminegrito',
      'tipografia.tamanhos.corpo',
      'espacamentos.confortavel.lg',
      'espacamentos.grade["largura-minima-acao"]',
    ],
    estados: [
      {
        nome: 'default',
        descricao: 'Superfície neutra com contorno em tom primário e texto contrastante.',
        tokensRelacionados: ['cores.neutras.superficie', 'cores.primarias.contorno', 'cores.neutras.contraste'],
      },
      {
        nome: 'hover',
        descricao: 'Intensifica o contorno e ajusta a cor do texto para reforçar a ação.',
        tokensRelacionados: ['cores.primarias["destaque-hover"]', 'cores.neutras.contraste'],
      },
      {
        nome: 'press',
        descricao: 'Aplicação de leve preenchimento translúcido com o tom de destaque.',
        tokensRelacionados: ['cores.primarias.destaque'],
      },
      {
        nome: 'focus',
        descricao: 'Mantém o contorno principal e adiciona um segundo traço externo para foco visível.',
        tokensRelacionados: ['cores.primarias.contorno'],
      },
      {
        nome: 'disabled',
        descricao: 'Desativa interação e aplica tom neutro de apoio no texto e contorno.',
        tokensRelacionados: ['cores.neutras.apoio'],
      },
    ],
    responsividade: [
      {
        condicao: '<768px',
        orientacao: 'Largura total com espaçamento vertical equivalente ao botão primário.',
      },
      {
        condicao: '>=768px',
        orientacao: 'Mantém altura mínima de 40px com espaçamento interno lateral de 12px.',
      },
    ],
  },
  {
    identificador: 'campo-entrada',
    nome: 'Campo de entrada',
    descricao: 'Entrada de texto de linha única para formulários simples e compostos.',
    bibliotecaEstilizacao: BIBLIOTECA_ESTILIZACAO_PADRAO,
    tokensFundamentais: [
      'cores.neutras.superficie',
      'cores.neutras.contraste',
      'cores.neutras.apoio',
      'cores.primarias.contorno',
      'cores.feedback.erro',
      'tipografia["familia-principal"]',
      'tipografia.pesos.regular',
      'tipografia.tamanhos.corpo',
      'espacamentos.confortavel.lg',
    ],
    estados: [
      {
        nome: 'default',
        descricao: 'Superfície neutra com borda discreta e texto contrastante.',
        tokensRelacionados: ['cores.neutras.superficie', 'cores.neutras.contraste', 'cores.neutras.apoio'],
      },
      {
        nome: 'focus',
        descricao: 'Substitui a borda por traço em tom primário e adiciona sombra suave.',
        tokensRelacionados: ['cores.primarias.contorno'],
      },
      {
        nome: 'erro',
        descricao: 'Mantém texto primário e colore bordas e mensagens com tom de erro.',
        tokensRelacionados: ['cores.feedback.erro'],
      },
      {
        nome: 'disabled',
        descricao: 'Reduz contraste do texto e bloqueia interação.',
        tokensRelacionados: ['cores.neutras.apoio'],
      },
    ],
    responsividade: [
      {
        condicao: '<768px',
        orientacao: 'Expande para 100% da largura disponível com espaçamento inferior de 8px.',
      },
      {
        condicao: '>=768px',
        orientacao: 'Limita largura máxima a 480px e mantém altura mínima de 40px.',
      },
    ],
  },
  {
    identificador: 'grupo-campos',
    nome: 'Grupo de campos',
    descricao: 'Wrapper para agrupar campos relacionados em formulários extensos.',
    bibliotecaEstilizacao: BIBLIOTECA_ESTILIZACAO_PADRAO,
    tokensFundamentais: [
      'espacamentos.confortavel.xl',
      'espacamentos.confortavel.lg',
      'espacamentos.compacto.md',
      'cores.feedback.erro',
      'tipografia["familia-principal"]',
      'tipografia.pesos.seminegrito',
      'tipografia.tamanhos.subtitulo',
    ],
    estados: [
      {
        nome: 'default',
        descricao: 'Aplica espaçamentos verticais coerentes entre rótulos e campos.',
        tokensRelacionados: ['espacamentos.confortavel.xl', 'espacamentos.compacto.md'],
      },
      {
        nome: 'erro',
        descricao: 'Destaca o título do agrupamento e o contorno dos campos com o tom de erro.',
        tokensRelacionados: ['cores.feedback.erro'],
      },
    ],
    responsividade: [
      {
        condicao: '<768px',
        orientacao: 'Empilha elementos em uma coluna e mantém margens laterais de 16px.',
      },
      {
        condicao: '>=768px',
        orientacao: 'Distribui campos em duas colunas respeitando múltiplos de 8px.',
      },
    ],
  },
  {
    identificador: 'card-informativo',
    nome: 'Card informativo',
    descricao: 'Realça métricas ou resumos de conteúdo em dashboards e listagens.',
    bibliotecaEstilizacao: BIBLIOTECA_ESTILIZACAO_PADRAO,
    tokensFundamentais: [
      'cores.neutras.superficie',
      'cores.neutras.contraste',
      'cores.neutras.apoio',
      'cores.primarias.destaque',
      'tipografia["familia-principal"]',
      'tipografia.pesos.seminegrito',
      'tipografia.tamanhos.subtitulo',
      'tipografia.tamanhos.corpo',
      'espacamentos.confortavel.xl',
      'espacamentos.confortavel.xxl',
      'espacamentos.grade["coluna-base"]',
    ],
    estados: [
      {
        nome: 'default',
        descricao: 'Superfície neutra elevada com sombra discreta e tipografia contrastante.',
        tokensRelacionados: ['cores.neutras.superficie', 'cores.neutras.contraste', 'espacamentos.confortavel.xl'],
      },
      {
        nome: 'hover',
        descricao: 'Aumenta a elevação e realça o contorno com tom primário transparente.',
        tokensRelacionados: ['cores.primarias.contorno'],
      },
      {
        nome: 'selecionado',
        descricao: 'Aplica barra lateral com tom de destaque e mantém conteúdo estável.',
        tokensRelacionados: ['cores.primarias.destaque'],
      },
    ],
    responsividade: [
      {
        condicao: '<768px',
        orientacao: 'Ocupa largura total com espaçamento interno de 16px e margens empilhadas.',
      },
      {
        condicao: '>=768px',
        orientacao: 'Aplica grade flexível com múltiplos de 8px entre ícones e textos.',
      },
      {
        condicao: '>=1280px',
        orientacao: 'Expande espaçamento interno para 32px mantendo proporções dos textos.',
      },
    ],
  },
  {
    identificador: 'banner-destaque',
    nome: 'Banner de destaque',
    descricao: 'Bloco hero com imagem opcional e chamada para ação principal.',
    bibliotecaEstilizacao: BIBLIOTECA_ESTILIZACAO_PADRAO,
    tokensFundamentais: [
      'cores.neutras.superficie',
      'cores.neutras.contraste',
      'cores.neutras.apoio',
      'tipografia["familia-principal"]',
      'tipografia.pesos.negrito',
      'tipografia.tamanhos.titulo',
      'tipografia.tamanhos.subtitulo',
      'tipografia.tamanhos.corpo',
      'espacamentos.confortavel.xxl',
      'espacamentos.confortavel.xl',
      'espacamentos.grade["coluna-base"]',
    ],
    estados: [
      {
        nome: 'default',
        descricao: 'Layout em duas colunas com texto à esquerda e imagem ou ilustração à direita.',
        tokensRelacionados: ['tipografia.tamanhos.titulo', 'espacamentos.confortavel.xxl'],
      },
      {
        nome: 'com vídeo',
        descricao: 'Substitui a imagem por player embutido mantendo proporções responsivas 16:9.',
        tokensRelacionados: ['espacamentos.grade["coluna-base"]'],
      },
    ],
    responsividade: [
      {
        condicao: '<960px',
        orientacao: 'Altera o layout para coluna, posicionando CTA imediatamente abaixo do texto.',
      },
      {
        condicao: '>=960px',
        orientacao: 'Mantém duas colunas proporcionais e alinha CTA ao bloco textual.',
      },
    ],
  },
] as const satisfies readonly ComponenteBase[];

/**
 * Retorna o catálogo completo de componentes base definidos no Passo 1.
 */
export function listarCatalogoBase(): readonly ComponenteBase[] {
  return catalogoBaseComponentes;
}

/**
 * Localiza um componente específico pelo identificador padrão.
 */
export function obterComponenteBase(identificador: string): ComponenteBase | undefined {
  return catalogoBaseComponentes.find((componente) => componente.identificador === identificador);
}

export { catalogoBaseComponentes };
