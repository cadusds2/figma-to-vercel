import path from 'node:path';
import { promises as fs } from 'node:fs';
import { parse as lerYaml } from 'yaml';
import { esquemaConfiguracaoProjeto, ConfiguracaoProjeto, ResumoProjetoConfigurado } from './esquema';
import {
  ErroConfiguracaoInvalida,
  ErroDiretorioConfiguracaoInexistente,
  ErroNenhumProjetoConfigurado,
} from './erros';

export interface ProjetoDisponivel {
  identificador: string;
  nome: string;
  caminhoArquivo: string;
  etiquetas?: string[];
  ambienteVercel: string;
  projetoVercel: string;
}

interface RegistroConfiguracao {
  caminhoArquivo: string;
  configuracao: ConfiguracaoProjeto;
}

const EXTENSOES_SUPORTADAS = new Set(['.yaml', '.yml']);

export class CarregadorConfiguracoesProjetos {
  private readonly diretorioConfiguracoes: string;

  constructor(diretorioBase?: string) {
    this.diretorioConfiguracoes = diretorioBase ?? path.resolve(process.cwd(), 'config/projetos');
  }

  async listarProjetosDisponiveis(): Promise<ProjetoDisponivel[]> {
    const registros = await this.carregarRegistros();

    return registros.map(({ configuracao, caminhoArquivo }) => ({
      identificador: configuracao.projeto.identificador,
      nome: configuracao.projeto.nome,
      etiquetas: configuracao.projeto.etiquetas,
      caminhoArquivo,
      ambienteVercel: configuracao.deploy.vercel.ambiente,
      projetoVercel: configuracao.deploy.vercel.projeto,
    }));
  }

  async carregarProjeto(identificador: string): Promise<ConfiguracaoProjeto> {
    const registros = await this.carregarRegistros();
    const encontrado = registros.find(({ configuracao }) => configuracao.projeto.identificador === identificador);

    if (!encontrado) {
      const disponiveis = registros.map(({ configuracao }) => configuracao.projeto.identificador).join(', ') || 'nenhum';
      throw new ErroConfiguracaoInvalida(
        `Projeto "${identificador}" não foi encontrado. Identificadores disponíveis: ${disponiveis}.`
      );
    }

    return encontrado.configuracao;
  }

  private async carregarRegistros(): Promise<RegistroConfiguracao[]> {
    const caminhos = await this.localizarArquivosConfiguracao();

    if (caminhos.length === 0) {
      throw new ErroNenhumProjetoConfigurado(this.diretorioConfiguracoes);
    }

    const registros: RegistroConfiguracao[] = [];
    const identificadores = new Map<string, string>();

    for (const caminhoArquivo of caminhos) {
      const registro = await this.lerArquivoConfiguracao(caminhoArquivo);
      const identificador = registro.configuracao.projeto.identificador;

      if (identificadores.has(identificador)) {
        const caminhoDuplicado = identificadores.get(identificador);
        throw new ErroConfiguracaoInvalida(
          `Identificador duplicado: "${identificador}" encontrado em ${caminhoArquivo} e ${caminhoDuplicado}. Ajuste os arquivos para manter identificadores únicos.`
        );
      }

      identificadores.set(identificador, caminhoArquivo);
      registros.push(registro);
    }

    return registros.sort((a, b) => a.configuracao.projeto.identificador.localeCompare(b.configuracao.projeto.identificador));
  }

  private async localizarArquivosConfiguracao(): Promise<string[]> {
    let estatisticasDiretorio;
    try {
      estatisticasDiretorio = await fs.stat(this.diretorioConfiguracoes);
    } catch (erro) {
      throw new ErroDiretorioConfiguracaoInexistente(this.diretorioConfiguracoes);
    }

    if (!estatisticasDiretorio.isDirectory()) {
      throw new ErroDiretorioConfiguracaoInexistente(this.diretorioConfiguracoes);
    }

    const entradas = await fs.readdir(this.diretorioConfiguracoes, { withFileTypes: true });

    return entradas
      .filter((entrada) => entrada.isFile() && EXTENSOES_SUPORTADAS.has(path.extname(entrada.name).toLowerCase()))
      .map((entrada) => path.join(this.diretorioConfiguracoes, entrada.name));
  }

  private async lerArquivoConfiguracao(caminhoArquivo: string): Promise<RegistroConfiguracao> {
    let conteudo: string;

    try {
      conteudo = await fs.readFile(caminhoArquivo, 'utf-8');
    } catch (erro) {
      throw new ErroConfiguracaoInvalida(`Não foi possível ler o arquivo ${caminhoArquivo}: ${(erro as Error).message}`);
    }

    let dadosBrutos: unknown;
    try {
      dadosBrutos = lerYaml(conteudo);
    } catch (erro) {
      throw new ErroConfiguracaoInvalida(
        `YAML inválido em ${caminhoArquivo}: ${(erro as Error).message}`
      );
    }

    const resultado = esquemaConfiguracaoProjeto.safeParse(dadosBrutos);

    if (!resultado.success) {
      const mensagens = resultado.error.issues
        .map((issue) => {
          const caminho = issue.path.join('.') || 'arquivo';
          return `• ${caminho}: ${issue.message}`;
        })
        .join('\n');
      throw new ErroConfiguracaoInvalida(
        `Estrutura inválida no arquivo ${caminhoArquivo}. Ajuste os seguintes pontos:\n${mensagens}`
      );
    }

    return { caminhoArquivo, configuracao: resultado.data };
  }
}

export type { ConfiguracaoProjeto, ResumoProjetoConfigurado };
