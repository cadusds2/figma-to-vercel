# Figma para Vercel

Ferramentas em TypeScript para transformar configurações declarativas em bases reutilizáveis de geração de interfaces a partir de projetos no Figma. O repositório já oferece utilitários de leitura de YAML, catálogo de componentes e uma CLI simples para conferir o estado das configurações antes que outras camadas (parser, gerador e deploy) sejam implementadas.

## Visão geral
- **Carregamento de projetos**: `CarregadorConfiguracoesProjetos` varre `config/projetos/`, valida cada arquivo com Zod e expõe métodos para listar e selecionar projetos por identificador.
- **Tokens de design**: `CarregadorTokensDesign` lê os temas declarados em `config/tokens/`, validando estrutura e mensagens de erro em português.
- **Catálogo de componentes**: `src/componentes/` concentra o catálogo base e utilitários para montar temas compatíveis com `styled-components`.
- **CLI de apoio**: comandos em `src/cli/` permitem listar e validar configurações antes de executar fluxos automatizados.

Com esses blocos, já é possível preparar protótipos e configurações enquanto o parser de Figma, o gerador de código e a automação de deploy são planejados nas issues do diretório [`docs/issues/`](docs/issues/README.md).

## Como começar
1. Instale o Node.js 20 ou superior.
2. Execute `npm install` para baixar dependências.
3. Utilize os scripts abaixo conforme necessário:

```bash
npm run listar:projetos
npm run validar:configuracoes
npm run compilar
```

- `listar:projetos` apresenta os projetos declarados em `config/projetos/` e seus destinos fictícios na Vercel.
- `validar:configuracoes` garante que os arquivos YAML estejam aderentes ao esquema.
- `compilar` gera os arquivos JavaScript em `dist/` caso deseje consumir os utilitários em outro projeto.

## Estrutura do repositório

```
figma-to-vercel/
├── config/
│   ├── figma/
│   │   └── indice-prototipos.yaml
│   ├── metricas/
│   │   └── padroes-qualidade.yaml
│   ├── projetos/
│   │   ├── README.md
│   │   └── exemplo-loja.yaml
│   ├── tokens/
│   │   ├── README.md
│   │   └── tema-padrao.yaml
│   └── README.md
├── docs/
│   ├── componentes/
│   │   └── base-biblioteca.md
│   ├── issues/
│   │   └── … (planos e análises do roadmap)
│   ├── prototipos/
│   │   └── guia-prototipos-figma.md
│   ├── testes/
│   │   └── estrategia-testes-metricas.md
│   ├── configuracao-projetos.md
│   └── README.md
├── src/
│   ├── cli/
│   │   ├── listar-projetos.ts
│   │   └── validar-configuracoes.ts
│   ├── componentes/
│   │   ├── catalogo-base.ts
│   │   ├── tema-styled.ts
│   │   ├── tipos.ts
│   │   └── README.md
│   ├── configuracao/
│   │   ├── carregador-tokens.ts
│   │   ├── erros.ts
│   │   ├── esquema.ts
│   │   ├── leitor-projetos.ts
│   │   └── README.md
│   └── README.md
├── README.md
├── package.json
└── tsconfig.json
```

## Fluxo de configuração
1. Duplique [`config/projetos/exemplo-loja.yaml`](config/projetos/exemplo-loja.yaml) para iniciar um novo projeto.
2. Ajuste os campos descritos no guia [`docs/configuracao-projetos.md`](docs/configuracao-projetos.md) com dados fictícios.
3. Atualize o índice de protótipos em [`config/figma/indice-prototipos.yaml`](config/figma/indice-prototipos.yaml) quando novos arquivos de design forem preparados.
4. Execute `npm run validar:configuracoes` para garantir que o esquema permaneça consistente.

## Documentação complementar
- [`docs/componentes/base-biblioteca.md`](docs/componentes/base-biblioteca.md): descreve o catálogo inicial de componentes e os tokens necessários.
- [`docs/prototipos/guia-prototipos-figma.md`](docs/prototipos/guia-prototipos-figma.md): orienta a criação de arquivos de referência no Figma.
- [`docs/testes/estrategia-testes-metricas.md`](docs/testes/estrategia-testes-metricas.md): define a estratégia de validação planejada para futuras entregas.
- [`docs/issues/`](docs/issues/README.md): reúne planos de iteração, decisões e análises que guiam a evolução do projeto.

## Roadmap e próximos passos
Os próximos incrementos priorizados estão descritos em [`docs/issues/next_steps.md`](docs/issues/next_steps.md). A etapa atual concentra esforços em:

- Detalhar a matriz de testes automatizados cobrindo parser, gerador e deploy contínuo.
- Definir métricas, limiares de aprovação e indicadores de alerta para monitorar as execuções.
- Integrar a coleta de métricas e verificações com o pipeline de CI/CD e com o cliente da API do Figma.

## Licença
Distribuído sob a licença MIT contida em [`LICENSE`](LICENSE).
