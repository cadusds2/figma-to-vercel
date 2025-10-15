# Guia de configuração de projetos Figma

Este módulo centraliza as definições de múltiplos projetos Figma em arquivos YAML, facilitando o carregamento por [`CarregadorConfiguracoesProjetos`](../src/configuracao/leitor-projetos.ts) e a execução dos comandos de CLI. Todas as configurações residem por padrão em `config/projetos/`.

## Estrutura de diretórios

```
config/
  projetos/
    exemplo-loja.yaml
```

Cada arquivo `.yaml` ou `.yml` representa um projeto independente. O nome do arquivo deve ser descritivo, mas o identificador oficial utilizado pela CLI é lido de `projeto.identificador` dentro do YAML.

## Campos do arquivo de configuração

```yaml
projeto:
  identificador: loja-virtual
  nome: "Loja Virtual Exemplo"
  descricao: "Projeto fictício para demonstrar configuração do pipeline."
  etiquetas:
    - ecommerce
    - prototipo
figma:
  arquivoId: "FIGMA_ARQUIVO_EXEMPLO"
  tokenLeitura: "FIGMA_TOKEN_FICTICIO"
  bibliotecaComponentes: "Biblioteca Base"
  tokensDesign:
    - cores-basicas
    - tipografia-principal
preferencias:
  geracao:
    estrategiaComponentes: isolados
    prefixoComponentes: "Loja"
    ignorarPaginas:
      - "Fluxos Antigos"
deploy:
  vercel:
    projeto: "loja-virtual-exemplo"
    ambiente: producao
    variaveis:
      API_BASE_URL: "https://api.exemplo.com"
      FEATURE_FLAG_NOVO_CHECKOUT: "true"
  comentarios: "Deploy automático previsto para iteração 4."
```

### Seção `projeto`
- `identificador`: texto único que será usado para selecionar o projeto via CLI ou pipeline.
- `nome`: nome legível do projeto.
- `descricao`: resumo opcional.
- `etiquetas`: lista opcional de palavras-chave.

### Seção `figma`
- `arquivoId`: ID do arquivo Figma que será processado.
- `tokenLeitura`: token de leitura gerado no Figma. Recomenda-se manter o valor real em variáveis de ambiente e referenciar aqui apenas tokens fictícios ou placeholders claros.
- `bibliotecaComponentes`: biblioteca compartilhada, caso exista.
- `tokensDesign`: lista opcional de tokens de design prioritários; deve casar com os nomes presentes em `config/tokens/`.

### Seção `preferencias`
- `geracao.estrategiaComponentes`: define se os componentes gerados serão `isolados` ou `agrupados`. Caso não seja informado, a estratégia padrão será definida pelo gerador futuro.
- `geracao.prefixoComponentes`: prefixo opcional para nomes de componentes gerados.
- `geracao.ignorarPaginas`: páginas do Figma que devem ser ignoradas durante a importação.

### Seção `deploy`
- `vercel.projeto`: nome do projeto na Vercel.
- `vercel.ambiente`: ambiente alvo (ex.: `producao`, `homologacao`, `desenvolvimento`).
- `vercel.variaveis`: mapa opcional de variáveis de ambiente adicionais. Utilize apenas valores fictícios.
- `comentarios`: observações livres sobre o fluxo de deploy ou particularidades do ambiente.

## Uso via CLI

Instale as dependências e execute os comandos abaixo:

```bash
npm install
npm run listar:projetos
npm run validar:configuracoes
```

- `listar:projetos` exibe os projetos disponíveis e o destino na Vercel.
- `validar:configuracoes` garante que todas as configurações cumprem o esquema definido.

## Adicionando novos projetos

1. Crie um arquivo `.yaml` em `config/projetos/` com um identificador único.
2. Preencha todas as chaves obrigatórias (`projeto`, `figma`, `deploy.vercel`).
3. Atualize variáveis sensíveis por meio de arquivos `.env` ou segredos da Vercel; não salve tokens reais no repositório.
4. Execute `npm run validar:configuracoes` para garantir que a configuração esteja correta.

Após estes passos, a CLI exibirá o projeto quando `npm run listar:projetos` for executado. Os módulos restantes do pipeline utilizarão o mesmo identificador para localizar o arquivo correspondente.
