# Figma para Vercel

Projeto destinado a automatizar a geração e o deploy de sites estáticos na Vercel a partir de arquivos de design hospedados no Figma. O foco inicial é construir uma base sólida que permita mapear componentes do Figma para estruturas HTML/CSS/React, gerar o código-fonte resultante e realizar o deploy contínuo.

## Objetivos do projeto
- Conectar-se à API do Figma para obter metadados e assets de arquivos compartilhados.
- Traduzir nós do Figma para componentes reutilizáveis em React/Next.js.
- Criar um pipeline que gere o código estático, realize testes básicos e publique o resultado na Vercel.
- Permitir configurações declarativas (mapeamento de componentes, tokens de design, variáveis de ambiente) para adaptar o comportamento do gerador.

## Escopo inicial
1. **Autenticação e acesso ao Figma**: implementar fluxo para consumir a API com tokens pessoais e ler arquivos específicos.
2. **Parser de documentos**: interpretar o JSON do Figma, normalizar cores, tipografia e layout, e construir uma representação intermediária.
3. **Gerador de componentes**: transformar a representação intermediária em componentes React com estilos compatíveis (CSS Modules, Tailwind ou styled-components a definir).
4. **Automação de deploy**: preparar scripts que construam o projeto gerado e executem `vercel deploy` usando tokens seguros.
5. **Interface de configuração**: definir esquema em YAML para parametrizar mapeamentos e comportamentos do gerador.

## Arquitetura proposta
- **CLI/Serviço Node.js** responsável por orquestrar as etapas de importação, transformação e deploy.
- **Adaptadores** para cada camada (Figma, gerador de código, provedor de deploy) para facilitar extensões futuras.
- **Templates** versionados para componentes base, contendo tokens de design e estilos padrão.
- **Pipelines** automatizados com GitHub Actions (ou similar) para validar e publicar.

## Ferramentas e dependências sugeridas
- Node.js 20+
- TypeScript
- Next.js como framework alvo para o site gerado
- Vite para gerar pacotes de bibliotecas internas, se necessário
- Zod para validação de esquemas
- Axios ou fetch nativo para chamadas HTTP
- Jest + Testing Library para testes unitários

## Estrutura atual
```
figma-to-vercel/
├── config/
│   ├── README.md
│   ├── projetos/
│   │   └── exemplo-loja.yaml
│   └── tokens/
│       ├── README.md
│       └── tema-padrao.yaml
├── docs/
│   ├── componentes/
│   │   └── base-biblioteca.md
│   └── configuracao-projetos.md
├── src/
│   ├── cli/
│   │   ├── listar-projetos.ts
│   │   └── validar-configuracoes.ts
│   ├── componentes/
│   │   ├── catalogo-base.ts
│   │   ├── index.ts
│   │   ├── README.md
│   │   ├── tema-styled.ts
│   │   └── tipos.ts
│   └── configuracao/
│       ├── carregador-tokens.ts
│       ├── erros.ts
│       ├── esquema.ts
│       └── leitor-projetos.ts
├── README.md
├── package.json
└── tsconfig.json
```

## Módulo de configuração de projetos
O módulo de configuração centraliza, em arquivos `.yaml` ou `.yml`, as informações necessárias para importar projetos do Figma e preparar o deploy na Vercel. Ele oferece:

- **Esquema validado com Zod** garantindo presença de chaves obrigatórias e mensagens de erro em português.
- **Suporte a múltiplos projetos** organizados em `config/projetos/`.
- **CLI auxiliar** para listar e validar configurações.

O guia completo com exemplo de arquivo encontra-se em [`docs/configuracao-projetos.md`](docs/configuracao-projetos.md).

## Catálogo de componentes base
O Passo 1 do roadmap estabeleceu um catálogo inicial de componentes e tokens compartilhados. O código correspondente encontra-se em `src/componentes/` e oferece:

- **Catálogo imutável** em [`src/componentes/catalogo-base.ts`](src/componentes/catalogo-base.ts), contendo identificadores, estados obrigatórios e tokens fundamentais.
- **Conversão de tema** em [`src/componentes/tema-styled.ts`](src/componentes/tema-styled.ts), que transforma os tokens validados em um objeto pronto para `styled-components`.
- **Carregador de tokens** em [`src/configuracao/carregador-tokens.ts`](src/configuracao/carregador-tokens.ts), facilitando o consumo de arquivos YAML em `config/tokens/`.

As diretrizes detalhadas continuam documentadas em [`docs/componentes/base-biblioteca.md`](docs/componentes/base-biblioteca.md).

### Comandos disponíveis

```bash
npm install
npm run listar:projetos
npm run validar:configuracoes
```

- `listar:projetos`: lista identificadores disponíveis e respectivos destinos na Vercel.
- `validar:configuracoes`: garante que todos os arquivos sigam o esquema estabelecido.

## Fluxo de desenvolvimento recomendado
1. Configurar tokens e variáveis de ambiente necessários (FIGMA_TOKEN, FIGMA_FILE_ID, VERCEL_TOKEN, etc.).
2. Criar protótipo de CLI que consome o Figma e salva o JSON bruto em `docs/` para inspeção.
3. Definir modelos de dados internos (tipos TypeScript) para representar nós, estilos e componentes.
4. Construir geradores incrementais: primeiro para páginas estáticas simples, depois para componentes complexos.
5. Integrar com o SDK/CLI da Vercel para criar e atualizar projetos automaticamente.
6. Automatizar testes e lint antes do deploy.

## Roteiro de implementação
| Iteração | Entregas principais |
|----------|---------------------|
| 1 | CLI mínima com autenticação no Figma e download de JSON |
| 2 | Parser inicial convertendo frames em estrutura intermediária |
| 3 | Gerador produzindo páginas estáticas básicas |
| 4 | Integração com Vercel e deploy automático |
| 5 | Configuração declarativa e documentação ampliada |

## Próximos passos
- Definir decisões de design de componentes e biblioteca de estilos padrão.
- Criar protótipos com arquivos de exemplo do Figma para guiar os testes.
- Especificar casos de teste e métricas de sucesso (tempo de deploy, cobertura de componentes suportados).
- Montar backlog detalhado em ferramentas como GitHub Projects ou Linear.

## Licença
Distribuído sob a licença MIT contida em `LICENSE`.
