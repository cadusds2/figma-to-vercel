export class ErroDiretorioConfiguracaoInexistente extends Error {
  constructor(caminho: string) {
    super(`Diretório de configurações não encontrado: ${caminho}`);
    this.name = 'ErroDiretorioConfiguracaoInexistente';
  }
}

export class ErroNenhumProjetoConfigurado extends Error {
  constructor(caminho: string) {
    super(`Nenhum arquivo de configuração foi localizado em ${caminho}. Crie pelo menos um arquivo .yaml ou .yml.`);
    this.name = 'ErroNenhumProjetoConfigurado';
  }
}

export class ErroConfiguracaoInvalida extends Error {
  constructor(mensagem: string) {
    super(mensagem);
    this.name = 'ErroConfiguracaoInvalida';
  }
}
