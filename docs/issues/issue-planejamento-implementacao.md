# Issue: Planejamento para início da implementação

## Contexto
O repositório já possui um módulo sólido de configuração que oferece leitura, validação e listagem de projetos em arquivos YAML. Há uma CLI inicial para validar essas configurações, mas ainda não existem integrações com a API do Figma nem com a Vercel, tampouco geradores de código. Esta issue documenta as lacunas e os passos necessários para iniciar a fase de implementação do pipeline completo.

## Avaliação do estado atual
- ✅ **Configurações declarativas**: esquema Zod consolidado (`src/configuracao/esquema.ts`) e exemplo em `config/projetos/exemplo-loja.yaml`.
- ✅ **CLI de suporte**: comandos `listar-projetos` e `validar-configuracoes` prontos para uso básico.
- ✅ **Catálogo de componentes e tokens**: catálogo base em `src/componentes/` e tokens oficiais em `config/tokens/tema-padrao.yaml`.
- ⚠️ **Ausência de integração com Figma**: nenhum adaptador HTTP ou cache local de arquivos JSON.
- ⚠️ **Sem representação intermediária**: não há modelos tipados para nós de design além do catálogo base.
- ⚠️ **Gerador inexistente**: falta o mecanismo que converte a representação intermediária em código Next.js.
- ⚠️ **Deploy não automatizado**: nenhum script ou integração com a CLI/SDK da Vercel foi criado.

## Lacunas para iniciar a implementação
### 1. Integração com o Figma
- Definir estratégia de autenticação usando tokens pessoais ou variáveis de ambiente.
- Implementar cliente HTTP com tratamento de erros (limites de rate, respostas 403/404).
- Salvar instantâneos dos JSON recebidos em `docs/` para facilitar depuração.

### 2. Modelo de dados e parser
- Mapear tipos TypeScript para nós relevantes (frames, componentes, textos, imagens).
- Implementar parser que transforme o JSON bruto em estrutura normalizada.
- Definir estratégia para tokens de design (cores, tipografia, espaçamentos).

### 3. Gerador de código
- Escolher biblioteca de estilos padrão (CSS Modules, Tailwind ou styled-components).
- Criar templates base e motor de geração (ex.: Mustache, Handlebars ou funções próprias).
- Garantir saída organizada em diretório temporário para posterior deploy.

### 4. Automação de testes e qualidade
- Configurar Jest/Testing Library para validar parser e gerador.
- Adicionar linting (ESLint/Prettier) alinhado às convenções do projeto.
- Definir matriz mínima de testes automatizados para cada iteração.

### 5. Pipeline de deploy na Vercel
- Preparar integração com a CLI da Vercel (token via variável de ambiente).
- Automatizar criação/atualização de projetos alvo.
- Especificar passo a passo de deploy contínuo (incluindo pré-visualizações).

### 6. Governança das configurações
- Estabelecer convenção para múltiplos ambientes por projeto (produção/homologação).
- Documentar como segredos serão armazenados (dotenv, GitHub Secrets, Vercel secrets).

## Plano de ação proposto
1. **Configurar cliente Figma**: criar módulo `src/figma/` com autenticação, download e armazenamento local de JSON.
2. **Definir modelos intermediários**: adicionar tipos e interfaces em `src/modelo/` para representar nós e estilos.
3. **Construir parser inicial**: converter frames principais em estrutura intermediária reutilizável.
4. **Prototipar gerador**: gerar páginas estáticas simples utilizando o modelo intermediário.
5. **Integrar com Vercel**: script inicial de deploy consumindo o artefato gerado.
6. **Estabelecer testes automatizados**: criar suites de testes para garantir regressões mínimas.
7. **Documentar decisões**: atualizar README principal e criar guias específicos em `docs/` a cada avanço (manter `docs/issues/next_steps.md` sincronizado com o status real).

## Próximos artefatos necessários
- Documento de arquitetura detalhando fluxos de dados e responsabilidades entre módulos.
- Guia de autenticação explicando variáveis de ambiente e gestão de segredos.
- Exemplos de saída gerada (templates) para orientar contribuições futuras.
