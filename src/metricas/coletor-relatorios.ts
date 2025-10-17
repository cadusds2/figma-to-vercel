import { promises as fs } from 'fs';
import { resolve } from 'path';
import { parse as interpretarYaml } from 'yaml';

const CAMINHO_CONFIGURACAO_PADRAO = 'config/metricas/padroes-qualidade.yaml';

interface DefinicaoLimiar {
  descricao: string;
  alvo: number;
  bloqueio: number;
  unidade: string;
}

interface ConfiguracaoMetricas {
  limiares: RegistroLimiares;
}

type RegistroLimiares = Record<string, DefinicaoLimiar>;

export interface OrigemRelatorioJest {
  identificador: string;
  caminhoArquivo: string;
}

export interface OrigemRelatorioPlaywright {
  identificador: string;
  caminhoArquivo: string;
}

export interface ParametrosColeta {
  relatoriosJest?: OrigemRelatorioJest[];
  relatorioPlaywright?: OrigemRelatorioPlaywright | null;
  caminhoConfiguracao?: string;
}

export interface ResumoSuiteTestes {
  identificador: string;
  ferramenta: 'jest' | 'playwright';
  formato: 'junit' | 'json';
  caminhoArquivo: string;
  totalTestes: number;
  testesComFalha: number;
  testesIgnorados: number;
  duracaoSegundos: number;
  aprovado: boolean;
}

type SituacaoLimiar =
  | 'acima_alvo'
  | 'entre_alvo_e_bloqueio'
  | 'abaixo_bloqueio'
  | 'indisponivel';

export interface ComparacaoLimiar {
  indicador: string;
  descricao: string;
  unidade: string;
  alvo: number;
  bloqueio: number;
  valorObservado: number | null;
  situacao: SituacaoLimiar;
  mensagem: string;
}

export interface ResumoMetricas {
  geradoEm: string;
  caminhoConfiguracao: string;
  suites: ResumoSuiteTestes[];
  totais: {
    testesExecutados: number;
    falhas: number;
    duracaoSegundos: number;
  };
  comparacoes: ComparacaoLimiar[];
}

export async function gerarResumoMetricas({
  relatoriosJest = [],
  relatorioPlaywright = null,
  caminhoConfiguracao = CAMINHO_CONFIGURACAO_PADRAO,
}: ParametrosColeta): Promise<ResumoMetricas> {
  const caminhoConfiguracaoAbsoluto = resolve(caminhoConfiguracao);
  const definicoes = await carregarConfiguracao(caminhoConfiguracaoAbsoluto);

  const suitesJest = await Promise.all(
    relatoriosJest.map(async (origem) => interpretarRelatorioJest(origem)),
  );

  const suitesPlaywright = relatorioPlaywright
    ? [await interpretarRelatorioPlaywright(relatorioPlaywright)]
    : [];

  const suites = [...suitesJest, ...suitesPlaywright];

  const totais = suites.reduce(
    (acumulado, suite) => {
      return {
        testesExecutados: acumulado.testesExecutados + suite.totalTestes,
        falhas: acumulado.falhas + suite.testesComFalha,
        duracaoSegundos: acumulado.duracaoSegundos + suite.duracaoSegundos,
      };
    },
    { testesExecutados: 0, falhas: 0, duracaoSegundos: 0 },
  );

  const relatorioPlaywrightInterpretado = suitesPlaywright[0] ?? null;
  const comparacoes = construirComparacoes({
    limiares: definicoes.limiares,
    totais,
    resumoPlaywright: relatorioPlaywrightInterpretado,
  });

  return {
    geradoEm: new Date().toISOString(),
    caminhoConfiguracao: caminhoConfiguracaoAbsoluto,
    suites,
    totais,
    comparacoes,
  };
}

async function carregarConfiguracao(caminho: string): Promise<ConfiguracaoMetricas> {
  try {
    const conteudo = await fs.readFile(caminho, 'utf-8');
    const dados = interpretarYaml(conteudo) as ConfiguracaoMetricas;
    if (!dados?.limiares) {
      throw new Error('Arquivo de configuração de métricas não possui o bloco "limiares".');
    }
    return dados;
  } catch (erro) {
    throw new Error(
      `Não foi possível carregar a configuração de métricas em "${caminho}": ${(erro as Error).message}`,
    );
  }
}

async function interpretarRelatorioJest({
  identificador,
  caminhoArquivo,
}: OrigemRelatorioJest): Promise<ResumoSuiteTestes> {
  try {
    const conteudoXml = await fs.readFile(caminhoArquivo, 'utf-8');
    const suites = extrairSuitesJUnit(conteudoXml);

    const totais = suites.reduce<{
      testes: number;
      falhas: number;
      ignorados: number;
      duracaoSegundos: number;
    }>(
      (acumulado, suite) => {
        const totalTexto = String(suite['@_tests'] ?? '0');
        const falhasTexto = String(suite['@_failures'] ?? '0');
        const ignoradosTexto = String(suite['@_skipped'] ?? '0');
        const tempoTexto = String(suite['@_time'] ?? '0');
        const testes = Number.parseInt(totalTexto, 10);
        const falhas = Number.parseInt(falhasTexto, 10);
        const ignorados = Number.parseInt(ignoradosTexto, 10);
        const tempo = Number.parseFloat(tempoTexto);
        return {
          testes: acumulado.testes + (Number.isNaN(testes) ? 0 : testes),
          falhas: acumulado.falhas + (Number.isNaN(falhas) ? 0 : falhas),
          ignorados: acumulado.ignorados + (Number.isNaN(ignorados) ? 0 : ignorados),
          duracaoSegundos: acumulado.duracaoSegundos + (Number.isNaN(tempo) ? 0 : tempo),
        };
      },
      { testes: 0, falhas: 0, ignorados: 0, duracaoSegundos: 0 },
    );

    return {
      identificador,
      ferramenta: 'jest',
      formato: 'junit',
      caminhoArquivo: resolve(caminhoArquivo),
      totalTestes: totais.testes,
      testesComFalha: totais.falhas,
      testesIgnorados: totais.ignorados,
      duracaoSegundos: totais.duracaoSegundos,
      aprovado: totais.falhas === 0,
    };
  } catch (erro) {
    throw new Error(
      `Falha ao interpretar o relatório JUnit "${caminhoArquivo}" do conjunto "${identificador}": ${(erro as Error).message}`,
    );
  }
}

function extrairSuitesJUnit(conteudoXml: string): Array<Record<string, unknown>> {
  const suites: Array<Record<string, unknown>> = [];
  const regexSuite = /<testsuite\b[^>]*>/gi;
  let resultado: RegExpExecArray | null = regexSuite.exec(conteudoXml);

  while (resultado) {
    const tag = resultado[0];
    suites.push({
      '@_tests': extrairNumeroDoAtributo(tag, 'tests'),
      '@_failures': extrairNumeroDoAtributo(tag, 'failures'),
      '@_skipped': extrairNumeroDoAtributo(tag, 'skipped'),
      '@_time': extrairNumeroDoAtributo(tag, 'time'),
    });
    resultado = regexSuite.exec(conteudoXml);
  }

  return suites;
}

function extrairNumeroDoAtributo(tag: string, atributo: string): number {
  const regex = new RegExp(`${atributo}="([^"]+)"`, 'i');
  const encontrado = regex.exec(tag);
  if (!encontrado) {
    return 0;
  }
  const valor = Number.parseFloat(encontrado[1]);
  return Number.isNaN(valor) ? 0 : valor;
}

async function interpretarRelatorioPlaywright({
  identificador,
  caminhoArquivo,
}: OrigemRelatorioPlaywright): Promise<ResumoSuiteTestes> {
  try {
    const conteudoJson = await fs.readFile(caminhoArquivo, 'utf-8');
    const estrutura = JSON.parse(conteudoJson) as Record<string, unknown>;
    const estatisticas = extrairEstatisticasPlaywright(estrutura);

    return {
      identificador,
      ferramenta: 'playwright',
      formato: 'json',
      caminhoArquivo: resolve(caminhoArquivo),
      totalTestes: estatisticas.total,
      testesComFalha: estatisticas.falhas,
      testesIgnorados: estatisticas.ignorados,
      duracaoSegundos: estatisticas.duracaoMs / 1000,
      aprovado: estatisticas.falhas === 0,
    };
  } catch (erro) {
    throw new Error(
      `Falha ao interpretar o relatório JSON "${caminhoArquivo}" do conjunto "${identificador}": ${(erro as Error).message}`,
    );
  }
}

interface EstatisticasPlaywright {
  total: number;
  aprovados: number;
  falhas: number;
  ignorados: number;
  duracaoMs: number;
}

function extrairEstatisticasPlaywright(estrutura: Record<string, unknown>): EstatisticasPlaywright {
  const estatisticas = estrutura.stats as Partial<Record<string, number>> | undefined;
  if (estatisticas) {
    const esperados = selecionarNumero(estatisticas.expected) ?? 0;
    const inesperados = selecionarNumero(estatisticas.unexpected) ?? 0;
    const instaveis = selecionarNumero(estatisticas.flaky) ?? 0;
    const ignorados = selecionarNumero(estatisticas.skipped) ?? 0;
    const duracao = selecionarNumero(estatisticas.duration) ?? 0;
    const total = esperados + inesperados + instaveis + ignorados;
    const aprovados = esperados + instaveis;
    const falhas = inesperados;
    return {
      total,
      aprovados,
      falhas,
      ignorados,
      duracaoMs: duracao,
    };
  }

  const suites = (estrutura.suites as unknown[]) ?? [];
  let total = 0;
  let aprovados = 0;
  let falhas = 0;
  let ignorados = 0;
  let duracaoMs = 0;

  function visitar(noAtual: unknown): void {
    if (!noAtual) {
      return;
    }

    if (Array.isArray(noAtual)) {
      noAtual.forEach((filho) => visitar(filho));
      return;
    }

    if (typeof noAtual !== 'object') {
      return;
    }

    const no = noAtual as Record<string, unknown>;

    visitarColecao(no.suites);
    visitarColecao(no.specs);
    visitarColecao(no.tests);

    if (Array.isArray(no.results)) {
      no.results.forEach((resultado) => {
        const registro = resultado as Record<string, unknown>;
        const duracaoResultado = selecionarNumero(registro.duration) ?? 0;
        duracaoMs += duracaoResultado;
        const estado = registro.status ?? registro.outcome;
        total += 1;
        if (estado === 'skipped') {
          ignorados += 1;
        } else if (estado === 'passed' || estado === 'expected' || estado === 'flaky') {
          aprovados += 1;
        } else {
          falhas += 1;
        }
      });
    }
  }

  function visitarColecao(colecao: unknown): void {
    if (Array.isArray(colecao)) {
      colecao.forEach((item) => visitar(item));
    }
  }

  suites.forEach((suite) => visitar(suite));

  if (total === 0) {
    total = aprovados + falhas + ignorados;
  }

  return {
    total,
    aprovados,
    falhas,
    ignorados,
    duracaoMs,
  };
}

function selecionarNumero(valor: unknown): number | undefined {
  if (typeof valor === 'number') {
    return valor;
  }
  if (typeof valor === 'string') {
    const convertido = Number.parseFloat(valor);
    return Number.isNaN(convertido) ? undefined : convertido;
  }
  return undefined;
}

function construirComparacoes({
  limiares,
  totais,
  resumoPlaywright,
}: {
  limiares: RegistroLimiares;
  totais: { testesExecutados: number; falhas: number; duracaoSegundos: number };
  resumoPlaywright: ResumoSuiteTestes | null;
}): ComparacaoLimiar[] {
  const comparacoes: ComparacaoLimiar[] = [];

  const possuiTestesExecutados = totais.testesExecutados > 0;
  const duracaoTotal = possuiTestesExecutados ? totais.duracaoSegundos : null;

  let valorTaxaFalhaDeploy: number | null = null;
  let mensagemTaxaFalha: string | undefined;
  if (!resumoPlaywright) {
    mensagemTaxaFalha =
      'Nenhum relatório de Playwright foi informado; não foi possível calcular a taxa de falhas do deploy.';
  } else if (resumoPlaywright.totalTestes === 0) {
    mensagemTaxaFalha =
      'O relatório do Playwright não contém casos executados; confirme a configuração dos testes end-to-end.';
  } else {
    valorTaxaFalhaDeploy = resumoPlaywright.testesComFalha / resumoPlaywright.totalTestes;
    mensagemTaxaFalha = 'Indicador calculado a partir dos testes end-to-end do Playwright.';
  }

  const mapaObservacoes: Record<string, { valor: number | null; mensagem?: string }> = {
    cobertura_componentes: {
      valor: null,
      mensagem:
        'O coletor ainda não recebe a cobertura de componentes; informe o percentual gerado pela etapa de build.',
    },
    tempo_pipeline_segundos: {
      valor: duracaoTotal,
      mensagem: possuiTestesExecutados
        ? undefined
        : 'Nenhuma suíte de testes foi informada; execute as etapas antes de consolidar as métricas.',
    },
    taxa_falhas_deploy: {
      valor: valorTaxaFalhaDeploy,
      mensagem: mensagemTaxaFalha,
    },
    tempo_reacao_falhas_horas: {
      valor: null,
      mensagem:
        'Integre os dados de incidentes do pipeline para registrar o tempo entre o alerta e a ação corretiva.',
    },
  };

  for (const [chave, limiar] of Object.entries(limiares)) {
    const observacao = mapaObservacoes[chave] ?? { valor: null };
    const situacao = avaliarSituacaoLimiar(observacao.valor, limiar);
    const mensagem = montarMensagemComparacao(limiar, observacao.valor, situacao, observacao.mensagem);
    comparacoes.push({
      indicador: chave,
      descricao: limiar.descricao,
      unidade: limiar.unidade,
      alvo: limiar.alvo,
      bloqueio: limiar.bloqueio,
      valorObservado: observacao.valor,
      situacao,
      mensagem,
    });
  }

  return comparacoes;
}

function avaliarSituacaoLimiar(valor: number | null, limiar: DefinicaoLimiar): SituacaoLimiar {
  if (valor === null || Number.isNaN(valor)) {
    return 'indisponivel';
  }
  const maiorMelhor = limiar.alvo > limiar.bloqueio;
  if (maiorMelhor) {
    if (valor >= limiar.alvo) {
      return 'acima_alvo';
    }
    if (valor >= limiar.bloqueio) {
      return 'entre_alvo_e_bloqueio';
    }
    return 'abaixo_bloqueio';
  }
  if (valor <= limiar.alvo) {
    return 'acima_alvo';
  }
  if (valor <= limiar.bloqueio) {
    return 'entre_alvo_e_bloqueio';
  }
  return 'abaixo_bloqueio';
}

function montarMensagemComparacao(
  limiar: DefinicaoLimiar,
  valor: number | null,
  situacao: SituacaoLimiar,
  mensagemExtra?: string,
): string {
  const partes: string[] = [];
  if (valor === null || Number.isNaN(valor)) {
    partes.push(
      'Valor ainda não coletado. Atualize o pipeline para informar este indicador conforme a documentação de métricas.',
    );
  } else {
    partes.push(
      `Valor observado: ${valor.toFixed(4)} ${limiar.unidade === 'proporcao' ? '(proporção)' : limiar.unidade}.`,
    );
    if (situacao === 'acima_alvo') {
      partes.push('Dentro do alvo estabelecido.');
    } else if (situacao === 'entre_alvo_e_bloqueio') {
      partes.push('Atenção: indicador entre o alvo e o ponto de bloqueio.');
    } else if (situacao === 'abaixo_bloqueio') {
      partes.push('Bloqueio: indicador acima do limite tolerado.');
    }
  }

  if (mensagemExtra) {
    partes.push(mensagemExtra);
  }

  return partes.join(' ');
}
