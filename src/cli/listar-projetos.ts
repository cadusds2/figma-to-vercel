#!/usr/bin/env ts-node
import { CarregadorConfiguracoesProjetos } from '../configuracao/leitor-projetos';

async function executar() {
  const carregador = new CarregadorConfiguracoesProjetos();

  try {
    const projetos = await carregador.listarProjetosDisponiveis();

    if (projetos.length === 0) {
      console.log('Nenhum projeto configurado foi encontrado.');
      return;
    }

    console.log('Projetos configurados disponíveis:');
    for (const projeto of projetos) {
      console.log(`- ${projeto.identificador} | ${projeto.nome} -> Vercel: ${projeto.projetoVercel} (${projeto.ambienteVercel})`);
    }
  } catch (erro) {
    console.error((erro as Error).message);
    process.exitCode = 1;
  }
}

executar();
