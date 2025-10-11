# Estratégia de testes e métricas do Passo 3

Este guia consolida as decisões do Passo 3 do roadmap descrito em [`docs/issues/plan-passo-3.md`](../issues/plan-passo-3.md), detalhando a matriz de testes, as métricas de sucesso e como monitorá-las continuamente após cada entrega automatizada.

## Objetivos do Passo 3
- Garantir que parser, gerador de código e automação de deploy sejam validados com cenários críticos.
- Definir métricas e limiares que indiquem se a plataforma está pronta para liberar artefatos automaticamente.
- Documentar um fluxo único de coleta e acompanhamento em pipeline contínuo.

## Matriz de testes
| Camada | Escopo | Ferramentas | Critérios de sucesso |
| ------ | ------ | ----------- | -------------------- |
| Parser de Figma | Conversão de frames, grids, textos ricos e imagens em modelos internos. | Jest com mocks do Figma, snapshots de JSON de protótipo e validação de schemas Zod. | Todas as fixtures de referência são interpretadas sem erros e produzem modelos compatíveis com as diretrizes do [Plano do Passo 1](../issues/plan-passo-1.md).
| Gerador de componentes | Produção de componentes React/Next.js com tokens de tema e estilos responsivos. | Jest + Testing Library renderizando componentes sintetizados. | Cada componente crítico possui teste de renderização com estados (hover/foco) e verificações de acessibilidade básica.
| Automação de deploy | Pipeline completo de build, publicação e validação pós-deploy. | Playwright executando smoke tests e scripts da CLI da Vercel. | O pipeline conclui em tempo aceitável e disponibiliza URL de pré-visualização sem regressões detectadas.

## Priorização das validações
1. Cobrir parser e gerador dos componentes priorizados no [Plano do Passo 1](../issues/plan-passo-1.md) utilizando protótipos aprovados.
2. Expandir testes de integração conforme novos tokens ou componentes forem adicionados.
3. Consolidar fluxos end-to-end apenas após a estabilização das camadas internas, reaproveitando dados fictícios já versionados.

## Métricas e limiares
Os limiares abaixo estão catalogados em [`config/metricas/padroes-qualidade.yaml`](../../config/metricas/padroes-qualidade.yaml) para consumo por scripts de observabilidade.

- **Cobertura de componentes automatizados:** mínimo aceitável de 85% do catálogo suportado (bloqueio abaixo de 70%).
- **Tempo total do pipeline automático:** alvo de até 5 minutos, com bloqueio acima de 7 minutos.
- **Taxa de falhas por deploy automático:** manter abaixo de 5% das execuções semanais, investigando qualquer pico acima de 2%.
- **Tempo de reação a falhas críticas:** abrir correção em até 4 horas úteis após o alerta, com plano de contingência documentado.

## Coleta e monitoramento
- Registrar a execução dos testes unitários e de integração com relatórios JUnit exportados pelo Jest.
- Consolidar resultados de Playwright e da CLI da Vercel em relatórios JSON interpretados pelo pipeline de CI.
- Enviar métricas para dashboard compartilhado (por exemplo, Data Studio ou Grafana) alimentado por scripts que consomem os relatórios padronizados.
- Configurar alertas automáticos quando algum limiar do arquivo de métricas for violado, notificando o time em canal dedicado.

## Ações corretivas
- Ao atingir o limiar de bloqueio de qualquer métrica, pausar novos deploys automatizados até estabilizar o indicador.
- Documentar incidentes em formato de post-mortem breve dentro de `docs/issues/` com lições aprendidas.
- Revisar trimestralmente os limiares para adaptá-los conforme o catálogo de componentes crescer.

## Próximas atividades recomendadas
Executar uma única tarefa abrangente que implemente a automatização dos relatórios do pipeline, contemplando:
1. Scripts de conversão dos relatórios de Jest e Playwright para o formato definido em `config/metricas/padroes-qualidade.yaml`.
2. Integração desses relatórios ao pipeline CI (GitHub Actions ou similar) com publicação em dashboard compartilhado.
3. Configuração de alertas automáticos vinculados aos limiares de bloqueio para impedir deploys fora dos padrões.

Com essas definições, o Passo 3 fica pronto para implementação incremental, mantendo rastreabilidade das validações e indicadores essenciais do produto.
