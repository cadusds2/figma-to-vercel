import { promises as fs } from 'fs';
import { resolve } from 'path';
import { gerarResumoMetricas, OrigemRelatorioJest } from '../metricas/coletor-relatorios';

const CAMINHO_RELATORIO_UNITARIO = 'relatorios/junit/testes-unitarios.xml';
const CAMINHO_RELATORIO_INTEGRACAO = 'relatorios/junit/testes-integracao.xml';
const CAMINHO_RELATORIO_PLAYWRIGHT = 'relatorios/playwright/resultados.json';
const CAMINHO_SAIDA = 'dist/metricas/relatorio.json';

async function executar(): Promise<void> {
  try {
    console.log('Iniciando consolidação de métricas dos testes automatizados.');
    const relatoriosJest = await selecionarRelatoriosJest();
    const relatorioPlaywright = (await existeArquivo(CAMINHO_RELATORIO_PLAYWRIGHT))
      ? { identificador: 'testes_end_to_end', caminhoArquivo: CAMINHO_RELATORIO_PLAYWRIGHT }
      : null;

    if (!relatoriosJest.length) {
      console.warn(
        'Aviso: nenhum relatório JUnit encontrado. Execute os testes unitários e de integração antes de gerar métricas.',
      );
    }

    if (!relatorioPlaywright) {
      console.warn(
        'Aviso: relatório do Playwright ausente. Rode os testes end-to-end para registrar a taxa de falhas de deploy.',
      );
    }

    const resumo = await gerarResumoMetricas({
      relatoriosJest,
      relatorioPlaywright,
    });

    await fs.mkdir(resolve('dist/metricas'), { recursive: true });
    await fs.writeFile(resolve(CAMINHO_SAIDA), JSON.stringify(resumo, null, 2), 'utf-8');

    console.log(`Relatório consolidado salvo em "${resolve(CAMINHO_SAIDA)}".`);
  } catch (erro) {
    console.error(`Erro ao gerar métricas consolidadas: ${(erro as Error).message}`);
    process.exitCode = 1;
  }
}

async function selecionarRelatoriosJest(): Promise<OrigemRelatorioJest[]> {
  const candidatos: OrigemRelatorioJest[] = [
    { identificador: 'testes_unitarios', caminhoArquivo: CAMINHO_RELATORIO_UNITARIO },
    { identificador: 'testes_integrados', caminhoArquivo: CAMINHO_RELATORIO_INTEGRACAO },
  ];

  const disponiveis: OrigemRelatorioJest[] = [];

  for (const relatorio of candidatos) {
    if (await existeArquivo(relatorio.caminhoArquivo)) {
      disponiveis.push(relatorio);
    } else {
      console.warn(
        `Aviso: relatório "${relatorio.caminhoArquivo}" não encontrado para o conjunto "${relatorio.identificador}".`,
      );
    }
  }

  return disponiveis;
}

async function existeArquivo(caminhoRelativo: string): Promise<boolean> {
  try {
    await fs.access(resolve(caminhoRelativo));
    return true;
  } catch {
    return false;
  }
}

void executar();
