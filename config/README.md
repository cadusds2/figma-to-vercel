# Configurações declarativas

O diretório `config/` centraliza todos os insumos declarativos utilizados pelos módulos disponíveis em `src/`. As informações aqui descritas alimentam a CLI de listagem/validação, o catálogo de componentes e os planos de evolução registrados em `docs/`.

## Estrutura
- [`projetos/`](projetos/README.md): arquivos YAML com dados fictícios de projetos Figma e destinos de deploy.
- [`figma/`](figma/indice-prototipos.yaml): índice com links, responsáveis e escopo dos protótipos de referência.
- [`tokens/`](tokens/README.md): temas de design consumidos pelo carregador de tokens e pelo catálogo de componentes.
- [`metricas/`](metricas/padroes-qualidade.yaml): limiares e comandos planejados para monitorar qualidade do pipeline.

## Convenções gerais
- Use YAML com indentação de dois espaços e mantenha comentários apenas quando essenciais.
- Prefira valores fictícios claros (`FIGMA_TOKEN_EXEMPLO`, `https://api.exemplo.com`) e jamais exponha credenciais reais.
- Atualize o README específico de cada subdiretório ao criar, renomear ou remover arquivos.

## Validação rápida
Execute `npm run validar:configuracoes` para garantir que todos os arquivos em `config/projetos/` estejam de acordo com o esquema definido em [`src/configuracao/esquema.ts`](../src/configuracao/esquema.ts). Aproveite para revisar também os tokens com o utilitário `CarregadorTokensDesign` antes de publicar novos temas.
