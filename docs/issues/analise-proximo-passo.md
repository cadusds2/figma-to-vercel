# Issue: Análise do próximo passo de implementação

## Contexto
Foi solicitado revisar a documentação disponível para identificar qual deve ser a próxima implementação prioritária no projeto **Figma para Vercel**.

## Referências consultadas
- [`docs/issues/next_steps.md`](./next_steps.md): tabela de priorização das iniciativas planejadas.
- [`docs/issues/plan-passo-3.md`](./plan-passo-3.md): planejamento detalhado da etapa de testes e métricas.
- [`docs/prototipos/resumo-validacao-passo-2.md`](../prototipos/resumo-validacao-passo-2.md): evidências da conclusão do Passo 2 e validações de acesso aos arquivos.
- [`config/figma/indice-prototipos.yaml`](../../config/figma/indice-prototipos.yaml): rastreabilidade dos arquivos liberados para uso pelo parser.
- [`docs/issues/issue-planejamento-implementacao.md`](./issue-planejamento-implementacao.md): visão geral das lacunas atuais, incluindo a integração futura com a API do Figma.

## Análise
A tabela de priorização aponta agora o **Passo 3 (testes e métricas)** como iniciativa de maior prioridade. O Passo 2 está concluído, entregando protótipos cobertos pelos três cenários principais e validações de acesso via API, conforme registrado no resumo de validação e no índice versionado. Com esses artefatos disponíveis, é possível iniciar a consolidação dos roteiros de teste e a definição das métricas operacionais descritas no plano do Passo 3.

## Conclusão
- **Próxima implementação prioritária:** executar o Passo 3 detalhando testes automatizados, métricas e critérios de sucesso, conforme descrito no plano específico.
- **Dependências atualizadas:** utilizar os protótipos consolidados no Passo 2 (listados no índice versionado) e os tokens do Passo 1 como base para criar cenários de teste; alinhar com a issue de planejamento da implementação para orquestrar o desenvolvimento do cliente da API do Figma e das automações necessárias.

Seguir essa ordem garante que, ao automatizar parser, geração e deploy, os protótipos e tokens aprovados estejam cobertos por testes monitoráveis.
