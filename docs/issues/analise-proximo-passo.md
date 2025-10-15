# Issue: Análise do próximo passo de implementação

## Contexto
Com a finalização do Passo 2 e a consolidação dos protótipos de referência, foi solicitado revisar a documentação disponível para confirmar qual iniciativa deve receber dedicação imediata no projeto **Figma para Vercel**.

## Referências consultadas
- [`docs/issues/next_steps.md`](./next_steps.md): tabela de priorização das iniciativas planejadas.
- [`docs/issues/plan-passo-3.md`](./plan-passo-3.md): planejamento detalhado da etapa de testes e métricas.
- [`docs/prototipos/resumo-validacao-passo-2.md`](../prototipos/resumo-validacao-passo-2.md): evidências da conclusão do Passo 2 e validações de acesso aos arquivos.
- [`config/figma/indice-prototipos.yaml`](../../config/figma/indice-prototipos.yaml): rastreabilidade dos arquivos liberados para uso pelo parser.
- [`docs/issues/issue-planejamento-implementacao.md`](./issue-planejamento-implementacao.md): visão geral das lacunas atuais, incluindo a integração futura com a API do Figma.

## Análise
A tabela de priorização destaca o **Passo 3 (testes e métricas)** como prioridade ativa, indicando que a próxima entrega deve focar na definição detalhada dos roteiros de teste, métricas operacionais e integrações necessárias para monitoramento. A documentação do Passo 2 comprova que os protótipos foram revisados, cobrem os três cenários essenciais e estão acessíveis via API, eliminando dependências pendentes para iniciar os trabalhos de QA. Além disso, o plano do Passo 3 já apresenta diretrizes sobre limiares e estrutura de documentação, restando implementar scripts, pipelines e mecanismos de acompanhamento contínuo.

## Conclusão
- **Foco atual:** executar o Passo 3, convertendo a estratégia documentada em suites de teste automatizadas, métricas rastreáveis e gatilhos de aprovação/reprovação no pipeline.
- **Ações imediatas:** priorizar a implementação dos scripts descritos no plano do Passo 3, conectando-os aos protótipos consolidados no Passo 2 e aos tokens definidos no Passo 1.
- **Coordenação necessária:** manter alinhamento com a issue de planejamento da implementação para garantir que a instrumentação do cliente da API do Figma e as integrações de monitoramento avancem em paralelo.

Essa priorização garante que, ao evoluir parser, geração e deploy, cada entrega seja avaliada por testes monitorados e por indicadores claros de sucesso.
