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
Os limiares abaixo estão catalogados em [`config/metricas/padroes-qualidade.yaml`](../../config/metricas/padroes-qualidade.yaml) para consumo por scripts de observabilidade. Os comandos `npm run test:unit`, `npm run test:integracao` e `npm run test:e2e` estão disponíveis e produzem relatórios nos formatos consumidos pelo coletor descrito a seguir.

- **Cobertura de componentes automatizados:** mínimo aceitável de 85% do catálogo suportado (bloqueio abaixo de 70%).
- **Tempo total do pipeline automático:** alvo de até 5 minutos, com bloqueio acima de 7 minutos.
- **Taxa de falhas por deploy automático:** manter abaixo de 5% das execuções semanais, investigando qualquer pico acima de 2%.
- **Tempo de reação a falhas críticas:** abrir correção em até 4 horas úteis após o alerta, com plano de contingência documentado.

### Execução das suítes
- `npm run test:unit`: gera `relatorios/junit/testes-unitarios.xml` com o resumo das validações unitárias.
- `npm run test:integracao`: produz `relatorios/junit/testes-integracao.xml` a partir das suítes de integração.
- `npm run test:e2e`: utiliza `playwright.config.ts` para salvar `relatorios/playwright/resultados.json` com o estado de cada fluxo end-to-end.

Após executar as suítes, rode `npm run gerar:metricas` para consolidar `dist/metricas/relatorio.json`. O comando está implementado em `src/cli/gerar-metricas.ts` e reutiliza o coletor `src/metricas/coletor-relatorios.ts`, que interpreta os relatórios do Jest (JUnit) e do Playwright (JSON) comparando-os com os limiares estabelecidos.

## Coleta e monitoramento
- Versionar os relatórios gerados em `relatorios/` apenas como artefatos temporários do pipeline; o arquivo de saída em `dist/metricas/relatorio.json` é o insumo oficial para ingestão em ferramentas externas.
- Enviar o JSON consolidado para um bucket ou tópico acessível ao dashboard compartilhado (Data Studio, Grafana ou equivalente) a cada execução da pipeline de CI.
- Configurar o sistema de alertas (PagerDuty, Opsgenie ou similar) para consumir o campo `comparacoes` do relatório consolidado, disparando notificações quando algum limiar estiver em situação `entre_alvo_e_bloqueio` ou `abaixo_bloqueio`.
- Alimentar retrospectivas com a seção `mensagem` de cada indicador, garantindo transparência sobre dados indisponíveis ou ações pendentes.

## Ações corretivas
- Ao atingir o limiar de bloqueio de qualquer métrica, pausar novos deploys automatizados até estabilizar o indicador.
- Documentar incidentes em formato de post-mortem breve dentro de `docs/issues/` com lições aprendidas.
- Revisar trimestralmente os limiares para adaptá-los conforme o catálogo de componentes crescer.

## Próximas atividades recomendadas
Executar uma única tarefa abrangente para integrar o relatório consolidado ao pipeline, contemplando:
1. Publicação automática do arquivo `dist/metricas/relatorio.json` como artefato da execução.
2. Integração do JSON consolidado ao dashboard compartilhado, priorizando visualizações por indicador (`comparacoes`).
3. Configuração de alertas automáticos vinculados aos limiares de bloqueio para impedir deploys fora dos padrões.

Com essas definições, o Passo 3 fica pronto para implementação incremental, mantendo rastreabilidade das validações e indicadores essenciais do produto.
