# Instruções para contribuidores

## Convenções gerais
- Toda comunicação, mensagens de commit, comentários e nomes de variáveis devem estar em português brasileiro.
- Utilize um tom objetivo, evitando anglicismos quando existirem equivalentes em português.
- Prefira implementar múltiplas melhorias relacionadas dentro de uma mesma tarefa quando isso não comprometer a clareza.

## Estilo de código
- O projeto será desenvolvido em TypeScript com suporte a ECMAScript moderno.
- Evite blocos `try/catch` ao redor de imports; trate erros no ponto de uso.
- Priorize funções puras e modularização por domínio (CLI, adaptadores, gerador, deploy).

## Documentação
- Atualize o `README.md` sempre que o fluxo principal ou decisões arquiteturais mudarem.
- Armazene documentação técnica adicional na pasta `docs/`.
- Inclua exemplos de configuração em português e com valores fictícios, nunca expondo credenciais reais.
