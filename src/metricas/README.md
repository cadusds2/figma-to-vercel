# Módulo de métricas

O diretório `src/metricas/` concentra utilitários para interpretar relatórios de teste e consolidar indicadores definidos em
`config/metricas/padroes-qualidade.yaml`. Os principais componentes são:

- `coletor-relatorios.ts`: carrega a configuração de limiares, consolida relatórios de Jest (JUnit) e Playwright (JSON),
  produzindo um objeto pronto para alimentar pipelines de observabilidade.

As funções deste módulo retornam estruturas tipadas para facilitar reuso em comandos da CLI e integrações externas.
