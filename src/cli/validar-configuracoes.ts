#!/usr/bin/env ts-node
import { CarregadorConfiguracoesProjetos } from '../configuracao/leitor-projetos';

async function executar() {
  const carregador = new CarregadorConfiguracoesProjetos();

  try {
    const projetos = await carregador.listarProjetosDisponiveis();

    if (projetos.length === 0) {
      console.log('Nenhum projeto configurado foi encontrado para validação.');
      return;
    }

    for (const projeto of projetos) {
      await carregador.carregarProjeto(projeto.identificador);
      console.log(`Configuração validada: ${projeto.identificador} (${projeto.nome})`);
    }

    console.log('Todas as configurações foram validadas com sucesso.');
  } catch (erro) {
    console.error((erro as Error).message);
    process.exitCode = 1;
  }
}

executar();
