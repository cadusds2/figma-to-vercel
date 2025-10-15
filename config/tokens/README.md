# Temas de tokens de design

Este diretório armazena os arquivos YAML consumidos pelo `CarregadorTokensDesign`. Eles descrevem paletas de cores, tipografia e espaçamentos necessários para montar o tema utilizado pelos componentes base em `src/componentes/`.

## Estrutura obrigatória
- `cores`: contém blocos `primarias`, `neutras` e `feedback`, todos com chaves obrigatórias validadas em [`src/configuracao/esquema.ts`](../../src/configuracao/esquema.ts).
- `tipografia`: reúne família, pesos, tamanhos e alturas de linha utilizados pelos componentes.
- `espacamentos`: define escalas compacta/confortável e parâmetros da grade responsiva.

## Como usar
1. Salve o arquivo em YAML com indentação de dois espaços e nome significativo (ex.: `tema-padrao.yaml`).
2. Execute `CarregadorTokensDesign.listarTemasDisponiveis()` para conferir se o tema foi reconhecido.
3. Carregue o tema com `CarregadorTokensDesign.carregarTema('tema-padrao')` e entregue o resultado para `montarTemaBase` em [`src/componentes/tema-styled.ts`](../../src/componentes/tema-styled.ts).

## Exemplos
- [`tema-padrao.yaml`](tema-padrao.yaml): tokens oficiais usados pelo catálogo atual de componentes.
