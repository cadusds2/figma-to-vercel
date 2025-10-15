# Issue: Análise do próximo passo de implementação

## Contexto
Foi solicitado revisar a documentação disponível para identificar qual deve ser a próxima implementação prioritária no projeto **Figma para Vercel**.

## Referências consultadas
- [`docs/issues/next_steps.md`](./next_steps.md): tabela de priorização das iniciativas planejadas.
- [`docs/issues/plan-passo-1.md`](./plan-passo-1.md): planejamento detalhado da iniciativa de maior prioridade.
- [`docs/issues/issue-planejamento-implementacao.md`](./issue-planejamento-implementacao.md): visão geral das lacunas atuais, incluindo a integração futura com a API do Figma.

## Análise
A priorização atual (Next Steps) aponta como ação imediata a **preparação dos arquivos de Figma de referência**. O Passo 1 foi concluído e já fornece catálogo de componentes e tokens. Para avançar com o parser e o cliente da API do Figma, é indispensável ter protótipos atualizados refletindo o catálogo. O plano do Passo 2 detalha como estruturar os arquivos, quais páginas cobrir e como manter o índice versionado.

## Conclusão
- **Próxima implementação prioritária:** executar o Passo 2 criando/atualizando os protótipos descritos e mantendo o índice em `config/figma/indice-prototipos.yaml` alinhado.
- **Dependência imediata:** após concluir o Passo 2, iniciar a implementação do cliente da API do Figma e evoluir para a etapa de testes do Passo 3.

Seguir essa ordem garante que, ao iniciar a automação de parser e geração, já existam protótipos consistentes com o catálogo e tokens aprovados.
