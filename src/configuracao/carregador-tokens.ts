import path from 'node:path';
import { promises as fs } from 'node:fs';
import { parse as lerYaml } from 'yaml';
import { esquemaTokensDesign, TokensDesign } from './esquema';
import { ErroConfiguracaoInvalida, ErroDiretorioConfiguracaoInexistente } from './erros';

const EXTENSOES_SUPORTADAS = new Set(['.yaml', '.yml']);

export class CarregadorTokensDesign {
  private readonly diretorioTokens: string;

  constructor(diretorioBase?: string) {
    this.diretorioTokens = diretorioBase ?? path.resolve(process.cwd(), 'config/tokens');
  }

  async listarTemasDisponiveis(): Promise<string[]> {
    const caminhos = await this.listarArquivosTokens();

    return caminhos
      .map((caminho) => path.basename(caminho))
      .map((arquivo) => arquivo.replace(/\.(yaml|yml)$/i, ''))
      .sort((a, b) => a.localeCompare(b));
  }

  async carregarTema(nomeTema: string): Promise<TokensDesign> {
    const caminhos = await this.listarArquivosTokens();
    const mapaTemas = new Map<string, string>();

    for (const caminho of caminhos) {
      const nomeArquivo = path.basename(caminho);
      const nomeBase = nomeArquivo.replace(/\.(yaml|yml)$/i, '');
      mapaTemas.set(nomeBase, caminho);
    }

    const caminhoTema = mapaTemas.get(nomeTema);

    if (!caminhoTema) {
      const disponiveis = await this.listarTemasDisponiveis();
      const lista = disponiveis.length > 0 ? disponiveis.join(', ') : 'nenhum';
      throw new ErroConfiguracaoInvalida(
        `Tema de tokens "${nomeTema}" não encontrado em ${this.diretorioTokens}. Temas disponíveis: ${lista}.`
      );
    }

    return this.lerArquivoTokens(caminhoTema);
  }

  private async listarArquivosTokens(): Promise<string[]> {
    let estatisticasDiretorio;
    try {
      estatisticasDiretorio = await fs.stat(this.diretorioTokens);
    } catch (erro) {
      throw new ErroDiretorioConfiguracaoInexistente(this.diretorioTokens);
    }

    if (!estatisticasDiretorio.isDirectory()) {
      throw new ErroDiretorioConfiguracaoInexistente(this.diretorioTokens);
    }

    const entradas = await fs.readdir(this.diretorioTokens, { withFileTypes: true });

    const arquivos = entradas
      .filter((entrada) => entrada.isFile() && EXTENSOES_SUPORTADAS.has(path.extname(entrada.name).toLowerCase()))
      .map((entrada) => path.join(this.diretorioTokens, entrada.name));

    if (arquivos.length === 0) {
      throw new ErroConfiguracaoInvalida(
        `Nenhum arquivo de tokens encontrado em ${this.diretorioTokens}. Crie um arquivo .yaml ou .yml com os tokens base.`
      );
    }

    return arquivos;
  }

  private async lerArquivoTokens(caminhoArquivo: string): Promise<TokensDesign> {
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
      throw new ErroConfiguracaoInvalida(`YAML inválido em ${caminhoArquivo}: ${(erro as Error).message}`);
    }

    const resultado = esquemaTokensDesign.safeParse(dadosBrutos);

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

    return resultado.data;
  }
}

export type { TokensDesign };
